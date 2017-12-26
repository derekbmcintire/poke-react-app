import React, { Component } from 'react';

class Display extends Component {
  // constructor is where you set the current state for this component
  // calling super gives this instance all the properties of the parent
  // setting pokemon and power to empty array and string as default state
  constructor() {
    super()
    this.state = {
      pokemon: [],
      power: ''
    }
  }

  // this is the click event callback function for getting one pokemon's power
  onGetPower(event) {
    // for some reason i was unable to use this same technique to save the url
    // so I used the name in the GET request
    const currentPoke = event.target.name
    // I found that fetch is an easy way to do a GET request without jQuery
    fetch('https://pokeapi.co/api/v2/pokemon/' + currentPoke)
      .then(results => {
        // but it is necessary to parse the results to json
        return results.json()
      }).then((result) => {
        const ability = result.abilities[0].ability.name
        // I needed to set the state of power to return this JSX element containing the data I wanted to display
        this.setState({power: <div key={currentPoke + 'Ability'}>
        <p>Name: {currentPoke}, Ability: {ability}</p>
        </div>})
        }
      )
  }

  // not totally sure why this is necessary, it may just be semantic
  componentWillMount() {
    // the initial GET request on page load to get the first 20 pokemon
    fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(results => {
      return results.json()
    })
      .then(data => {
        // same as above just storing an array of JSX elements to display later
        let pokemon = data.results.map((poke) => {
          return(
            <div key={poke.name}>
              <p>Name: {poke.name}</p>
            <button name={poke.name} onClick={this.onGetPower.bind(this)}>click to see {poke.name}{"'s ability"}</button>
            </div>
          )
        })
        // setting the pokemon array in state to the above array
        this.setState({pokemon: pokemon})
      })
  }
  render() {
    return (
      <div>
        {this.state.power}
        {this.state.pokemon}
      </div>
    );
  }
}

export default Display;
