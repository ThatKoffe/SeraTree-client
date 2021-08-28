import { useState, useEffect } from 'react';
import { uriv2 } from '../config.json'
import ErrorMsg from './errorMsg';
import { Link } from 'react-router-dom';
import { setToken, clearToken, setId, setUsername } from '../redux/user';
import { useSelector, useDispatch } from 'react-redux';

function LoginView() {
    const [error, setError] = useState({error: false, msg: ''});
    const [loading, setLoading] = useState(false);
    const {token} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        if(token){ 
            try {
                setLoading(true);
                fetch(uriv2 + '/user/validate', {
                    method: "post",
                    headers: {
                        "token": token?.payload
                    }
                })
                .then(r=>r.json())
                .then(d=>{
                    console.log(d)
                    if(d.code !== 200){
                        setError({ 
                            error: true,
                            msg: "Login session invalid."
                        });
                        setLoading(false);
                        return dispatch(clearToken())
                    }
                    setLoading(false);
                })
            } catch(e){
                setError({ 
                    error: true,
                    msg: "Internal server error."
                });
                setLoading(false);
            }
        }
    },[])

    const handleUsernameChange = (event) => {
        setName(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleSubmit = (event) => {
        setLoading(true);
        try {
            if(token){
                setError({
                    error: true,
                    msg: "Already logged in!"
                });
                return setLoading(false)
            } 

            fetch(uriv2 + '/user', {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    password: password
                })
            })
            .then(r=>r.json())
            .then(d=>{
                console.log(d)
                if(d.code !== 200){
                    setError({
                        error: true,
                        msg: d.msg
                    });
                    return setLoading(false)
                } else {
                    setError({
                        error: false,
                        msg: ''
                    })
                    dispatch(setToken(d.json.token));
                    dispatch(setId(d.json.id));
                    dispatch(setUsername(d.json.name));
                    return setLoading(false)
                }
            })
        } catch(e){
            setError({
                error: true,
                msg: 'Internal server error.'
            });
            return setLoading(false)
        }
        event.preventDefault();
    }

    if(loading) return (
        <div id="loading-response">
            <span>
                Loading, please wait!
            </span>
        </div>
    )

    return (
        <div id="login-container">
            <h3>Register!</h3>
            <hr/>
            <div id="error-msg">
                <span className="error-text">{error.msg}</span>
            </div>
            
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" value={name} onChange={handleUsernameChange}/>
                <br/>
                <input type="password" value={password} onChange={handlePasswordChange}/>
                <br/>
                {
                    token ? 
                    <p>You are now logged in!</p>
                    : <input type="submit"/>
                }
            </form>
            <hr/>
        </div>
    )
}

export default LoginView