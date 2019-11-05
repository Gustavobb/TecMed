import React from "react";
import Popup from "reactjs-popup";
 
export default (props) => (
  <Popup trigger={<button className="btn btn-lg btn-primary btn-block"> Registrar</button>} position="top center">
    <div>{props.text}</div>
  </Popup>
);