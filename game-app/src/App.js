import React, { Component } from "react";
import FriendCard from "./components/FriendCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import friends from "./friends.json";
import "./App.css";

class App extends Component {
  state = {
    friends: friends,
    score: 0,
    clickedFriends: friends

  };

  
  removeFriend = id => {
    console.log("ID of the character to remove: " + id);
    const removedFriends = this.state.clickedFriends.filter(friend => friend.id !== id);
    console.log(removedFriends);
    this.shuffleArray(removedFriends, friends);
  };
  
  shuffleArray = (removedFriends, friends) => {
    for (let i = this.state.friends.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [friends[i], friends[j]] = [friends[j], friends[i]]; 
    }
    this.setState({
      friends: friends,
      clickedFriends:removedFriends
    });
    // console.log("Friends: " + JSON.stringify(this.state.friends));
  };
  
  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    console.log("Clicked friends: " + JSON.stringify(this.state.clickedFriends));
    // console.log(friends);
    return (
      <Wrapper>
        <Title>Friends List</Title>
        {this.state.friends.map(friend => (
          <FriendCard
            removeFriend={this.removeFriend}
            shuffleArray = {this.shuffleArray}
            friend={friends}
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
