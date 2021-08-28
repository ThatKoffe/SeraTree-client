import { useState, useEffect } from 'react';
import { uriv2 } from '../config.json'
import { useSelector } from 'react-redux';
import ErrorMsg from './errorMsg';
import LoginView from './loginView';
import { Link, useParams } from 'react-router-dom';

function UserEditPage() {
    const { token, username, userId } = useSelector((state) => state.user);
    let { id } = useParams();
    let uid = id ? id : 0;

    const [data, setData] = useState({});
    const [links, setLinks] = useState([]);
    const [error, setError] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(false);
    const [okMsg, setOkMsg] = useState(false);
    const [linkName, setLinkName] = useState('');
    const [linkUri, setLinkUri] = useState('');

    useState(() => {
        if(token){ 
            try {
                setLoading(true)
                fetch(uriv2 + '/user/validate', {
                    method: "POST",
                    headers: {
                        "token": token.payload
                    }
                })
                .then(r=>r.json())
                .then(d=>{
                    console.log(d)
                    let userArray = [];
                    console.log(d.json.user)
                    if(d.code !== 200){
                        setError(true);
                        setLoading(false);
                    } else if(d.json.error){
                        setError(true);
                        setLoading(false);
                    } else {
                        setData([
                            d.json.user.id,
                            d.json.user.name
                        ]);
                        setLinks(d.json.user.links);
                        setIsAuth(true);
                        setLoading(false);
                    }
                });
            } catch(e){
                setError(true);
                setLoading(false);
            }
        }
    }, [])

    if(loading) return (
        <div id="user-page">
            <br/>
            Loading...
        </div>
    )

    if(!isAuth) return (
        <div id="user-page">
            <h4>Unauthorized.</h4>
            <br/>
            <ErrorMsg/>
        </div>
    )

    if(error) return (
        <div id="user-page">
            <h4>Yikes</h4>
            <br/>
            <ErrorMsg/>
        </div>
    )

    const handleLinkName = (event) => {
        setLinkName(event.target.value);
    }
    const handleLinkUri = (event) => {
        setLinkUri(event.target.value);
    }
    const handleSubmit = (event) => {
        setLoading(true);
        let submitLinks = links;
        let newLink = {
            "name": linkName,
            "uri": linkUri
        }
        submitLinks.push(newLink);

        fetch(`${uriv2}/user/links`, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "token": token.payload
            },
            body: JSON.stringify({
                links: submitLinks
            })
        })
        .then(r=>r.json())
        .then(d=>{
            console.log(d);
            // d.json.links

            if(d.code !== 200){
                setError(true)
                return setLoading(false)
            } else if(d.json.error){
                setError(true)
                return setLoading(false)
            } else {
                setOkMsg(true);
                return setLoading(false);
            }
        })

        event.preventDefault();
    }


    if(!loading) return (
        <div id="user-page" className="userInfo">
            <br/>
                <ul>
                    {links?.map(x => {

                        return (
                            <li>
                                <a href={x.uri} target="_blank" title={x.uri}>{x.name}</a>
                            </li>
                        )

                    })}
                </ul>

                <form className="form" onSubmit={handleSubmit}>
                    <h5>New Link</h5>
                    {okMsg ? <p style={{color: 'green'}}>Updated links!</p> : ''}
                    <input type="text" placeholder="Link name" value={linkName} onChange={handleLinkName}/>
                    <br/>
                    <input type="text" placeholder="Link URI" value={linkUri} onChange={handleLinkUri}/>
                    <br/>
                    <input type="submit"/>
            </form>
        </div>
    );
}

export default UserEditPage