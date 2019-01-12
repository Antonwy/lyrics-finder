import React, { Component } from 'react';
import './App.css';
import Axios from 'axios';

const url = "https://api.lyrics.ovh/v1/"

class App extends Component {

  state = {
    artist: "",
    title: "",
    lyrics: "",
    name: "",
    error: {
      code: 0,
      text: ""
    }
  }

  // errorCodes:
  //   0: default value
  //   1: no input
  //   2: wrong input

  onSubmitText = (input) => {
    input.preventDefault();
    const {artist, title} = this.state;
    
    if(artist === "" || title === "" || artist === "" && title === ""){
      this.setState({error: {text: "Type in some values!", code: 1}})
      return
    }

    Axios.get(`${url}${artist}/${title}`)
      .then(res => {
        this.setState({
          lyrics: res.data.lyrics,
          name: this.getName(),
          error: {text: "", code: 0}
        });
      })
      .catch(err => {
        this.setState({
          error: {text: "Can't find this song!", code: 2}
        })
      })
  }

  onChangeInput = (type) => (event) => {
    
    if(this.state.error.code === 1){
      this.setState({error: {text: "", code: 0}})
    }
    
    this.setState({
      [type]: event.target.value
    })
  }

  getName = () => {
    const {artist, title} = this.state;
    const formattedArtist = artist.toUpperCase();
    const formattedTitle = title.toUpperCase();
    return formattedArtist + " - " + formattedTitle;
  }

  render() {
    return (
      <div>
        <h1 className="title">Lyrics Finder</h1>
        <form className="searchForm" onSubmit={this.onSubmitText}>
          <input name="artist" value={this.state.artist} onChange={this.onChangeInput('artist')} type="text" placeholder="Artist"></input>
          <input name="title" value={this.state.title} onChange={this.onChangeInput('title')} type="text" placeholder="Title"></input>
          <button type="submit">Search</button>
          <p>{this.state.error.text}</p>
        </form>
        <h2 className="name">{this.state.name}</h2>
        <p className="lyrics">{`${this.state.lyrics}`}</p>
      </div>
    );
  }
}

export default App;
