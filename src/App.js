import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Blurb from "./components/Blurb";
import cards from "./card.json";
import Nav from "./components/Nav";
import "./App.css";

class App extends Component {
  state = {
    cards: cards,
    score: 0,
    unClickedCards: cards,
    topScore: 0,
    blurb: "Click on unique characters to gain a point. If you click on a character that you've already selected, the game will end."
  };

  validateForDupes = id => {
    console.log(id);
    let numOfDupes = 0;
    for (var i=0; i<this.state.unClickedCards.length; i++) {
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
      unClickedCards:removedCards,
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
  
  render() {
    console.log("Clicked cards: " + JSON.stringify(this.state.unClickedCards));
    console.log("score: " + this.state.score)
    return (
      <row>
        <col-xl-12>
      <Wrapper>
      <Nav>Score: {this.state.score}   |   Top Score: {this.state.topScore}</Nav>
        <Blurb>{this.state.blurb}</Blurb>
        {this.state.cards.map(card => (
          <Card
            validateForDupes = {this.validateForDupes}
            id={card.id}
            key={card.id}
            name={card.name}
            image={card.image}
            occupation={card.occupation}
            location={card.location}
          />
        ))}
      </Wrapper>
      </col-xl-12>
      </row>
    );
  }
}

export default App;
