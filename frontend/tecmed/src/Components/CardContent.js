import React, {useEffect} from 'react';
import '../css/Card.css'
import {Link} from 'react-router-dom';


const CardContent = ({name, id})=>{
    
    useEffect( () => {
    }, []);

    return(
        
        <div className="Item">
            <Link to={`/test/${id}`} style={{textDecoration: 'none'}}>
                <h1>{name}</h1>
            </Link>
        </div>
        
    );
};

export default CardContent;