import { useState, useEffect } from 'react';
import { uri } from '../config.json'
import ErrorMsg from './errorMsg';

function Header() {
    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            fetch(`${uri}/user`)
                .then(r=>r.json())
                .then(d=>{
                    if(d.code !== 200){
                        setError(true);
                        setData({});
                        setLoading(false);
                    } else {
                        setError(false);
                        console.log(d)
                        setData(d);
                        setLoading(false);
                    }
                }).catch(() => {
                    setError(true);
                    setLoading(false);
                })
        } catch(e){
            setError(true);
            setLoading(false);
        }
    }, [])

    if(loading) return (
        <div id="user-header">
            <h2>Serazon</h2>
            <br/>
            Loading...
        </div>
    )

    if(error) return (
        <div id="user-header">
            <h2>Serazon</h2>
            <br/>
            <ErrorMsg/>
        </div>
    )

    if(!loading) return (
        <div id="user-header" className="userInfo">
            <h2>Serazon</h2>
            <br/>

            <img src={data.json.icon} alt={data.json.username} height="50" width="50"/>
            <span>
                {data.json.username}
            </span>
        </div>
    );
}

export default Header