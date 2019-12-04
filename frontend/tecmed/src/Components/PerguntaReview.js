import {Link} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form'



const PerguntaReview = ({pergunta1, pergunta2, pergunta3, videoId, usr}) => {

    return(
        <Form >
            <form action={`/review2/VideoId=${videoId}&usr=${usr}`}>
                <per>{pergunta1}</per>
                <div>
                    <n>Reprovado</n>
                    <Form.Check inline type={"checkbox"} name="resposta1" value="0"/>
                    <Form.Check inline type={"checkbox"} name="resposta1" value="1" />
                    <Form.Check inline type={"checkbox"} name="resposta1" value="2" />
                    <n>Aprovado</n>
                </div>
                <br/>

                <per>{pergunta2}</per>
                <div>
                    <n>0  </n>
                    <input type="radio" className='radioButton' name="resposta2" value="0" />
                    <input type="radio" className='radioButton' name="resposta2" value="1"/>
                    <input type="radio" className='radioButton' name="resposta2" value="2"/>
                    <input type="radio" className='radioButton' name="resposta2" value="3"/>
                    <input type="radio" className='radioButton' name="resposta2" value="4"/>
                    <input type="radio" className='radioButton' name="resposta2" value="5"/>
                    <input type="radio" className='radioButton' name="resposta2" value="6"/>
                    <input type="radio" className='radioButton' name="resposta2" value="7" checked/>
                    <input type="radio" className='radioButton' name="resposta2" value="8"/>
                    <input type="radio" className='radioButton' name="resposta2" value="9"/>
                    <input type="radio" className='radioButton' name="resposta2" value="10"/>
                    <n>  10</n>
                </div>
                <br/>

                <per>{pergunta3}</per>
                <div>
                    <n>0  </n>
                    <input type="radio" className='radioButton' name="resposta3" value="0" />
                    <input type="radio" className='radioButton' name="resposta3" value="1"/>
                    <input type="radio" className='radioButton' name="resposta3" value="2"/>
                    <input type="radio" className='radioButton' name="resposta3" value="3"/>
                    <input type="radio" className='radioButton' name="resposta3" value="4"/>
                    <input type="radio" className='radioButton' name="resposta3" value="5"/>
                    <input type="radio" className='radioButton' name="resposta3" value="6"/>
                    <input type="radio" className='radioButton' name="resposta3" value="7" checked/>
                    <input type="radio" className='radioButton' name="resposta3" value="8"/>
                    <input type="radio" className='radioButton' name="resposta3" value="9"/>
                    <input type="radio" className='radioButton' name="resposta3" value="10"/>
                    <n>  10</n>
                </div>
                <br/>

                <div>
                    <button type="submit" className="button">Submit</button>
                </div>
            </form>          
        </Form>
    );
}


export default PerguntaReview;