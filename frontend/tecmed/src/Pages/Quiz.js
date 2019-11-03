import React from 'react';
const Quiz = ({match}) => {
    console.log("oi", match.params.id)
    return(
        <div>
            <h1>Olá {match.params.id}</h1>
            <iframe src="https://www.youtube.com/embed/7XSFRdCkpsQ" width="852" height="480">VIdeo</iframe>
        </div>
    );
}


export default Quiz;