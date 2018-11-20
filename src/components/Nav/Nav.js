import React from "react";
import "./Nav.css";

const Nav = props => (
<h1 className="nav">
<button className="btn btn-success"
onClick={props.openModal}>
Instructions
</button>
Score: {props.score}   |   Top Score: {props.topScore}
</h1>
)

export default Nav;
