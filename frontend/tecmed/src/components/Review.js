import React from 'react';

const Review = ({match}) => {
    return(
        <div>
            <h1>Video: {match.params.id}</h1>
            <p>vamos agora avaliar esse vídeo</p>
        </div>
    );
}


export default Review;