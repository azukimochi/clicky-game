import React, { Component } from "react";
import "./Modal.css";
import Modal from 'react-modal';

const customStyles = {
  content: {
    background: '#3d3737',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

const modal = props => (
  
  <Modal
    isOpen={props.modalIsOpen}
    onRequestClose={props.closeModal}
    style={customStyles}
    contentLabel="Example Modal"
  >
  <div className="modalContainer">
    <p id="close" onClick={props.closeModal}>x</p>
    <br/>
    <h2>How to Play</h2>
    <div className="modalBlurb">Remember your childhood cartoons?</div>
    <div className="modalBlurb">This is a fun matching game themed after them!</div>
    <br/>
    <ul>
      <li>Click on unique characters to gain a point.</li>
      <li>If you click on a character that was previously selected, your score will drop to 0 and the game will end.</li>
      <li>The top score will be recorded.</li>
    </ul>
    </div>
  </Modal>

)

export default modal;
