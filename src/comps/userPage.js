import { useState, useEffect } from 'react';
import { uriv2 } from '../config.json'
import { useSelector } from 'react-redux';
import ErrorMsg from './errorMsg';
import LoginView from './loginView';
import { Link, useParams } from 'react-router-dom';

function UserPage() {
    // const { token } = useSelector((state) => state.user);
    let { id } = useParams();
    let uid = id ? id : 0;

    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useState(() => {
        setLoading(true)
        fetch(uriv2 + '/user/' + uid)
            .then(r=>r.json())
            .then(d=>{
                if(d.code !== 200){
                    setError(true);
                    setLoading(false);
                } else if(d.json.error){
                    setError(true);
                    setLoading(false);
                } else {
                    setData(d.json.user)
                    setLoading(false);
                }
            })
    }, [])

    if(loading) return (
        <div id="user-page">
            <br/>
            Loading...
        </div>
    )

    if(error) return (
        <div id="user-page">
            <h4>Yikes</h4>
            <br/>
            <ErrorMsg/>
        </div>
    )


    if(!loading) return (
        <div id="user-page" className="userInfo">
            <Link to="/">Home</Link>
            <br/>
            <h4>{data.name}</h4>
            <br/>
                <ul>
                    {data.links?.map(x => {

                        return (
                            <li>
                                <a href={x.uri} target="_blank" title={x.uri}>{x.name}</a>
                            </li>
                        )

                    })}
                </ul>
        </div>
    );
}

export default UserPage