import React from "react";
import "./Blurb.css";


const Blurb = props => <h1 className="blurb" style={props.style}>{props.blurb}</h1>;

export default Blurb;
