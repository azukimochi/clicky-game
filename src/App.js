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
    unClickedFriends: friends

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
      this.endGame();
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
      score: score
    });
  };

  endGame = () => {
    console.log("game ended");
    this.setState({
      friends: friends,
      score: 0,
      unClickedFriends: friends
    })
  }
  
  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    console.log("Clicked friends: " + JSON.stringify(this.state.unClickedFriends));
    console.log("score: " + this.state.score)
    // console.log("Friends " + friends);
    return (
      <Wrapper>
      <Nav>Score: {this.state.score}</Nav>
        <Title>Friends List</Title>
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
