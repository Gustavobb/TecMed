import {Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';


const PerguntaReview = ({pergunta1, pergunta2, pergunta3, videoId}) => {

    const url = `/review/Quiz/VideoId=${videoId}`

    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(window.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };
    
    const r1 = getUrlParameter('resposta1');
    const r2 = getUrlParameter('resposta2');
    const r3 = getUrlParameter('resposta3');

    return(
        <div className='Review'>
            <form action={url}>
                <per>{pergunta1}</per>
                <div>
                    <n>0  </n>
                    <input type="radio" name="resposta1" value="0"/>
                    <input type="radio" name="resposta1" value="1"/>
                    <input type="radio" name="resposta1" value="2"/>
                    <input type="radio" name="resposta1" value="3"/>
                    <input type="radio" name="resposta1" value="4"/>
                    <input type="radio" name="resposta1" value="5"/>
                    <input type="radio" name="resposta1" value="6"/>
                    <input type="radio" name="resposta1" value="7" checked/>
                    <input type="radio" name="resposta1" value="8"/>
                    <input type="radio" name="resposta1" value="9"/>
                    <input type="radio" name="resposta1" value="10"/>
                    <n>  10</n>
                </div>
                <br/>

                <per>{pergunta2}</per>
                <div>
                    <n>0  </n>
                    <input type="radio" name="resposta2" value="0" />
                    <input type="radio" name="resposta2" value="1"/>
                    <input type="radio" name="resposta2" value="2"/>
                    <input type="radio" name="resposta2" value="3"/>
                    <input type="radio" name="resposta2" value="4"/>
                    <input type="radio" name="resposta2" value="5"/>
                    <input type="radio" name="resposta2" value="6"/>
                    <input type="radio" name="resposta2" value="7" checked/>
                    <input type="radio" name="resposta2" value="8"/>
                    <input type="radio" name="resposta2" value="9"/>
                    <input type="radio" name="resposta2" value="10"/>
                    <n>  10</n>
                </div>
                <br/>

                <per>{pergunta3}</per>
                <div>
                    <n>0  </n>
                    <input type="radio" name="resposta3" value="0" />
                    <input type="radio" name="resposta3" value="1"/>
                    <input type="radio" name="resposta3" value="2"/>
                    <input type="radio" name="resposta3" value="3"/>
                    <input type="radio" name="resposta3" value="4"/>
                    <input type="radio" name="resposta3" value="5"/>
                    <input type="radio" name="resposta3" value="6"/>
                    <input type="radio" name="resposta3" value="7" checked/>
                    <input type="radio" name="resposta3" value="8"/>
                    <input type="radio" name="resposta3" value="9"/>
                    <input type="radio" name="resposta3" value="10"/>
                    <n>  10</n>
                </div>
                <br/>

                <div>
                    <button type="submit" className="search-button">Submit</button>
                </div>
            </form>          
        </div>
    );
}


export default PerguntaReview;