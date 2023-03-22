import './App.css';
import React, { Component } from 'react';
import Ideas from '../Ideas/Ideas';
import Form from '../Form/Form'
// import ideasData from './ideasData'
// import fetchIdeas from './apiCalls';

class App extends Component {
  constructor() {
    super();
    this.state = {
      ideas: []
    }
  }

  addIdea = (newIdea) => {
    this.setState({ ideas: [...this.state.ideas, newIdea] });
  }

  componentDidMount() {
    this.fetchIdeas()
  }

  deleteIdea = (id) => {
    console.log(id);
    const filteredIdeas = this.state.ideas.filter(idea => idea.id != id);
    this.setState({ ideas: filteredIdeas });
  }

  fetchIdeas = () => {
    fetch('http://localhost:3001/api/v1/ideas')
          .then((response)=> response.json())
          .then((apiData)=> this.setState({ideas: apiData}))
          .catch(error => console.log(`issue with: ${error}`))
  }

  render() {
    return ( 
      <main className="app">
        <h1 className="app-title">Shane Misra's Ideation Station:</h1>
        {!this.state.ideas.length && <h2>No ideas yet -- add some!</h2>}
        <Ideas ideas={this.state.ideas} deleteIdea={this.deleteIdea}/>
        <Form addIdea={this.addIdea}/>
      </main>
     )
  }
}

export default App;