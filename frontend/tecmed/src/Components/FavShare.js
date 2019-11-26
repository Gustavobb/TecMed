import React from 'react';
import '../css/QuizUser.css'


const FavShare = () => {
    var currentLocation = window.location.href;
   
    return(
        <div className='FavShare'>
{/* o favorito ainda nao faz nada! -> tem que pegar o id do usuario e salvar como favorito*/}
<div id="share-buttons"> 
    <a target="_blank">
        <img style={{width:"2rem", marginLeft:"28.3rem"}} src="https://image.flaticon.com/icons/svg/87/87925.svg" alt="Favorite" />
    </a>

    <a href={`https://api.whatsapp.com/send?text=Olha esse conteúdo de saúde que eu encontrei: ${currentLocation}`} target="_blank">
        <img style={{width:"2rem", marginLeft:"0.3rem"}} src="https://i0.wp.com/www.vectorico.com/wp-content/uploads/2018/02/Whatsapp-Icon.png?w=600" alt="WhatsApp" />
    </a>

    <a href={`http://www.facebook.com/sharer.php?u=${currentLocation}`} target="_blank">
        <img style={{width:"2rem", marginLeft:"0.3rem"}} src="https://simplesharebuttons.com/images/somacro/facebook.png" alt="Facebook" />
    </a>
     
    <a href={`https://twitter.com/share?url=${currentLocation}`} target="_blank">
        <img style={{width:"2rem", marginLeft:"0.3rem"}} src="https://simplesharebuttons.com/images/somacro/twitter.png" alt="Twitter" />
    </a>

</div>
        </div>
    );
}


export default FavShare;