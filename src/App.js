import React, { Component } from 'react';
import {CardList} from './components/card-list/card-list.component';
import {SearchBox} from './components/search-box/searchbox.component'
// import logo from './logo.svg';
import './App.css';

class App extends Component { //App is a class type component
  constructor(){
    super();

    this.state={
      monsters: [],
      searchField: ''
    };
  }

  componentDidMount(){ //when app component is mounted fetch names for monsters from this link
   fetch('https://jsonplaceholder.typicode.com/users') //fetch returns a promise object
   .then(response => response.json()) //.json's used to convert response from url to json format, which JS treats as obj
   .then(users => this.setState({monsters: users}));
  };

  handleChange = e => this.setState({searchField: e.target.value})

  render(){
    //we make a copy of state and alter it to preserve original state
    const {monsters, searchField} = this.state; //shorter syntax for assigning state's vars to monsters & searchField (destructuring syntax)
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLocaleLowerCase())); //checking if input char is present in monster's name
    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder='Seach monsters'
          handleChange={ this.handleChange }
         />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
