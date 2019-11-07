import React from 'react';
import '../css/Home.css'


const FavShare = () => {
    return(
        <div className='FavShare'>
{/* tem que mudar o https pro link do nosso site que vai ser compartilado */}
{/* o favorito ainda nao faz nada! */}
<div id="share-buttons"> 
    <a target="_blank">
        <img style={{width:"2rem"}} src="https://img.icons8.com/flat_round/64/000000/star--v3.png" alt="Favorite" />
    </a>

    <a href="http://www.facebook.com/sharer.php?u=https://simplesharebuttons.com" target="_blank">
        <img style={{width:"2rem"}} src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" />
    </a>
     
    <a href="https://twitter.com/share?url=https://simplesharebuttons.com&amp;text=Simple%20Share%20Buttons&amp;hashtags=simplesharebuttons" target="_blank">
        <img style={{width:"2rem"}} src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" />
    </a>

</div>
        </div>
    );
}


export default FavShare;