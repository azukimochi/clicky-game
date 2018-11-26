import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Blurb from "./components/Blurb";
import cards from "./components/Card/card.json";
import Nav from "./components/Nav";
import Modal from "./components/Modal";
import "./App.css";

class App extends Component {
  state = {
    cards: cards,
    score: 0,
    unClickedCards: cards,
    topScore: 0,
    blurb: "Click on unique characters to gain a point. If you click on a character that you've already selected, the game will end.",
    modalIsOpen: false,
    blurbstyle: "",
    defaultStyle: false
  };

  componentDidMount = () => {
    this.setState({ modalIsOpen: true });
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  validateForDupes = id => {
    let numOfDupes = 0;
    for (var i = 0; i < this.state.unClickedCards.length; i++) {
      if (this.state.unClickedCards[i].id === id) {
        numOfDupes++;
      }
    }
    console.log("# of dupes: " + numOfDupes)
    if (numOfDupes === 1) {
      this.removeCard(id);
    } else if (numOfDupes === 0) {
      this.endGame(this.state.score);
    }
    numOfDupes = 0;
  }

  removeCard = id => {
    const removedCards = this.state.unClickedCards.filter(card => card.id !== id);
    let score = this.state.score;
    score++;
    this.shuffleArray(removedCards, score);
  };

  shuffleArray = (removedCards, score) => {
    this.onHit()
    const shuffledCards = this.state.cards;
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    this.setState({
      cards: shuffledCards,
      unClickedCards: removedCards,
      score: score,
      blurb: "Way to go! +1 point!"
    });
  };

  endGame = score => {
    if (score > this.state.topScore) {
      this.onMiss()
      this.setState({
        topScore: score,
        cards: cards,
        score: 0,
        unClickedCards: cards,
        blurb: "You lose. Try again!"
      })
    } else {
      this.onMiss()
      this.setState({
        cards: cards,
        score: 0,
        unClickedCards: cards,
        blurb: "You lose. Try again!"
      })
    }
  }

  onHit = () => {
    const correctStyle = {
      color: 'green',
      transition: 'opacity 2s',
      opacity: 1
    }
    this.setState({
      defaultStyle: false,
      blurbStyle: correctStyle
    })
    setTimeout(() => this.setState({
      defaultStyle: true
    }), 1000)
  }

  onMiss = () => {
    const correctStyle = {
      color: 'coral',
      transition: 'opacity 2s',
      opacity: 1
    }
    this.setState({
      defaultStyle: false,
      blurbStyle: correctStyle
    })
    setTimeout(() => this.setState({
      defaultStyle: true
    }), 1000)
  }


  render() {
    const defaultStyle = {
      color: 'white',
      opacity: 0
    }
    return (
      <row>
        <col-xl-12>
          <Wrapper>
            <Nav
              score={this.state.score}
              topScore={this.state.topScore}
              openModal={this.openModal}
            />
            {this.state.defaultStyle ?
              <Blurb
                style={defaultStyle}
                blurb={this.state.blurb}
              />
              :
              <Blurb
                style={this.state.blurbStyle}
                blurb={this.state.blurb}
              />
            }
            {this.state.cards.map((card, index) => (
              <Card
                validateForDupes={this.validateForDupes}
                id={card.id}
                key={card.id}
                image={card.image}
              />
            ))}
          </Wrapper>
          <Modal
            modalIsOpen={this.state.modalIsOpen}
            closeModal={this.closeModal}
          />
        </col-xl-12>
      </row>
    );
  }
}

export default App;
