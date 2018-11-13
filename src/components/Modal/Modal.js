import React, { Component } from "react";
import "./Modal.css";
import Modal from 'react-modal';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class modal extends Component {

    state = {
        modalIsOpen: false
    }

    componentDidMount = () => {
        this.setState({modalIsOpen: true});
    }

openModal = () => {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal = () => {
    this.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({modalIsOpen: false});
  }

  render() {
      return (
      <Modal
      isOpen={this.state.modalIsOpen}
      onAfterOpen={this.afterOpenModal}
      onRequestClose={this.closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      >
      
      <h2 ref={subtitle => this.subtitle = subtitle}>Hello</h2>
      <button onClick={this.closeModal}>close</button>
      <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form>
      </Modal>

      )
  }
  
};

export default modal;
