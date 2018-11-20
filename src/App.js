import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Blurb from "./components/Blurb";
import cards from "./card.json";
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
    console.log(id);
    let numOfDupes = 0;
    for (var i = 0; i < this.state.unClickedCards.length; i++) {
      if (this.state.unClickedCards[i].id === id) {
        numOfDupes++;
      }
    }
    console.log("# of dupes: " + numOfDupes)
    if (numOfDupes === 1) {
      console.log("exists");
      this.removeCard(id);
    } else if (numOfDupes === 0) {
      console.log("doesn't exist");
      this.endGame(this.state.score);
    }
    numOfDupes = 0;
  }

  removeCard = id => {
    console.log("ID of the character to remove: " + id);
    const removedCards = this.state.unClickedCards.filter(card => card.id !== id);
    console.log(removedCards);
    let score = this.state.score;
    score++;
    this.shuffleArray(removedCards, score);
  };

  shuffleArray = (removedCards, score) => {
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
    console.log("game ended and the match's score is: " + score);
    if (score > this.state.topScore) {
      this.setState({
        topScore: score,
        cards: cards,
        score: 0,
        unClickedCards: cards,
        blurb: "You lose. Try again!"
      })
    } else {
      this.setState({
        cards: cards,
        score: 0,
        unClickedCards: cards,
        blurb: "You lose. Try again!"
      })
    }
  }
  
  test = event => {
    event.preventDefault();
    const correctStyle = {
      color: 'blue',
      transition: 'opacity 3s',
      opacity: 0
    }
    this.setState({
      blurbStyle: correctStyle,
      defaultStyle: false
    })
   setTimeout(() => this.setState({
     defaultStyle: true
   }), 1000)
  }

  test2 = event => {
    event.preventDefault();
    const correctStyle = {
      color: 'red',
      transition: 'opacity 3s',
      opacity: 0
    }
    this.setState({
      blurbStyle: correctStyle,
      defaultStyle: false
    })
   setTimeout(() => this.setState({
     defaultStyle: true
   }), 1000)
  }


  render() {
    console.log("Clicked cards: " + JSON.stringify(this.state.unClickedCards));
    console.log("score: " + this.state.score)
    
    const defaultStyle = {
      color: 'black',
      opacity: 1
    }

    return (
      <row>
        <col-xl-12>

          <Wrapper>
            <Nav
              score={this.state.score}
              topScore={this.state.topScore}
              test={this.test}
              test2={this.test2}
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

            {this.state.cards.map(card => (

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
