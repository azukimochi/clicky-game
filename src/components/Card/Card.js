import React from "react";
import "./Card.css";

const Card = props => (
  <div onClick={() => props.validateForDupes(props.id)} 
    className="card">
    <div className="img-container">
      <img alt={props.name} src={props.image} />
    </div>
  </div>
);

export default Card;
