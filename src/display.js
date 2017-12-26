import React, { Component } from 'react';

class Display extends Component {
  constructor() {
    super()
    this.state = {
      pokemon: [],
      power: ''
    }
  }

  onGetPower(event) {
    const currentPoke = event.target.name
    fetch('https://pokeapi.co/api/v2/pokemon/' + currentPoke)
      .then(results => {
        return results.json()
      }).then((result) => {
        const ability = result.abilities[0].ability.name
        this.setState({power: <div key={currentPoke + 'Ability'}>
        <p>Name: {currentPoke}, Ability: {ability}</p>
        </div>})
        }
      )
  }

  componentWillMount() {
    fetch('https://pokeapi.co/api/v2/pokemon/')
    .then(results => {
      return results.json()
    })
      .then(data => {
        let pokemon = data.results.map((poke) => {
          return(
            <div key={poke.name}>
              <p>Name: {poke.name}</p>
            <button name={poke.name} onClick={this.onGetPower.bind(this)}>click to see {poke.name}{"'s ability"}</button>
            </div>
          )
        })
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
