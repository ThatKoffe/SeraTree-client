import { useState, useEffect } from 'react';
import { uriv2 } from '../config.json'
import { useSelector } from 'react-redux';
import ErrorMsg from './errorMsg';
import LoginView from './loginView';
import { Link, Route } from 'react-router-dom';

function HeaderV2() {
    const { token, username, userId } = useSelector((state) => state.user);

    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    const [loginView, setLoginView] = useState(false);
    const [loading, setLoading] = useState(false);

    if(loginView) return (
        <div id="header-login">
            <button onClick={ () => setLoginView(false) }>Close Page</button>
            <LoginView/>
        </div>
    )

    if(loading) return (
        <div id="user-header">
            <h2>SeraTree</h2>
            <br/>
            Loading...
        </div>
    )

    if(error) return (
        <div id="user-header">
            <h2>SeraTree</h2>
            <br/>
            <ErrorMsg/>
        </div>
    )


    if(!loading) return (
        <div id="user-header" className="userInfo">
            <h2>SeraTree</h2>
            <br/>
            <span>

                { token ? <UserView/> :        
                <button onClick={ () => setLoginView(true) }>
                    Login
                </button> 
                }

            </span>
        </div>
    );
}

function UserView(){
    const { token, username, userId } = useSelector((state) => state.user);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);


    useState(() => {
        setLoading(true);
        fetch(uriv2 + '/user/validate', {
            method: "POST",
            headers: {
                "token": token.payload
            }
        })
        .then(r=>r.json())
        .then(d=>{
            let userArray = [];
            console.log(d.json.user)
            if(d.code !== 200){
                setError(true);
                setLoading(false);
            } else if(d.json.error){
                setError(true);
                setLoading(false);
            } else {
                setUser([
                    d.json.user.id,
                    d.json.user.name
                ]);
                setLoading(false);
            }
        });
    },[])

    if(loading) return (
        <div id="user-details">
            <span>Loading details...</span>
        </div>
    )

    if(error) return (
        <div id="user-details">
            <ErrorMsg/>
        </div>
    )

    return (
        <div id="user-details">
            Welcome, {username.payload}

            <div id="user-controls">
                <Link to="/">Home</Link>
                &nbsp;
                <Link to={'/u/' + userId.payload}>View page</Link>
                &nbsp;
                <Link to="/me/edit">Edit Links</Link>
            </div>
        </div>
    )
}

export default HeaderV2