import { useState, useEffect } from 'react';
import { uri } from '../config.json'
import ErrorMsg from './errorMsg';

function Products() {
    const [data, setData] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${uri}/products`)
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
    }, [])

    if(loading) return (
        <div id="product-section">
            <h3>Products</h3>
            <hr/>

            Loading...
        </div>
    )

    if(error) return (
        <div id="product-section">
            <h3>Products</h3>
            <hr/>

            <ErrorMsg/>
        </div>
    )

    if(!loading) return (
        <div id="product-section">
            <h3>Products</h3>
            <hr/>

            <ul className="product-list">
                {data.json.map((p) => {

                    return (
                        <li itemID={p.id} key={p.id}>

                            <img src={p.details.icon} alt={p.name} width="50" height="50"/>

                            <h4><strong>{p.name}</strong></h4>

                            <h5>{p.details.pricing} euros</h5>
                        </li>
                    )

                })}
            </ul>
        </div>
    );
}

export default Products