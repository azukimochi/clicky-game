import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import Nav from "./components/Nav";
import "./App.css";

class App extends Component {
  state = {
    friends: friends,
    score: 0,
    unClickedFriends: friends,
    topScore: 0,
    blurb: "Click on unique characters to gain a point. If you click on a character that you've already selected, the game will end."
  };

  validateForDupes = id => {
    console.log(id);
    let numOfDupes = 0;
    for (var i=0; i<this.state.unClickedFriends.length; i++) {
      if (this.state.unClickedFriends[i].id === id) {
        numOfDupes++;
      }
    }
    console.log("# of dupes: " + numOfDupes)
    if (numOfDupes === 1) {
      console.log("exists");
      this.removeFriend(id);
    } else if (numOfDupes === 0) {
      console.log("doesn't exist");
      this.endGame(this.state.score);
    }
    numOfDupes = 0;
  }

  removeFriend = id => {
    console.log("ID of the character to remove: " + id);
    const removedFriends = this.state.unClickedFriends.filter(friend => friend.id !== id);
    console.log(removedFriends);
    let score = this.state.score;
    score++;
    this.shuffleArray(removedFriends, score);
  };
  
  shuffleArray = (removedFriends, score) => {
    const shuffledFriends = this.state.friends;
    for (let i = shuffledFriends.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledFriends[i], shuffledFriends[j]] = [shuffledFriends[j], shuffledFriends[i]]; 
    }
    this.setState({
      friends: shuffledFriends,
      unClickedFriends:removedFriends,
      score: score,
      blurb: "Way to go! +1 point!"
    });
  };

  endGame = score => {
    console.log("game ended and the match's score is: " + score);
    if (score > this.state.topScore) {
      this.setState({
        topScore: score,
        friends: friends,
        score: 0,
        unClickedFriends: friends,
        blurb: "You lose. Try again!"
      }) 
    } else {
      this.setState({
        friends: friends,
        score: 0,
        unClickedFriends: friends,
        blurb: "You lose. Try again!"
      })
    }
  }
  
  render() {
    console.log("Clicked friends: " + JSON.stringify(this.state.unClickedFriends));
    console.log("score: " + this.state.score)
    return (
      <Wrapper>
      <Nav>Score: {this.state.score} Top Score: {this.state.topScore}</Nav>
        <Title>{this.state.blurb}</Title>
        {this.state.friends.map(friend => (
          <FriendCard
            validateForDupes = {this.validateForDupes}
            id={friend.id}
            key={friend.id}
            name={friend.name}
            image={friend.image}
            occupation={friend.occupation}
            location={friend.location}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
