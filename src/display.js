import React, { Component } from 'react';

class Display extends Component {
  constructor() {
    super()
    this.state = {
      pokemon: []
    }
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
            <button url={poke.url}>click to see {poke.name}{"'s ability"}</button>
            </div>
          )
        })
        this.setState({pokemon: pokemon})
        console.log('state', this.state.pokemon)
      })
  }
  render() {
    return (
      <div>
        {this.state.pokemon}
      </div>
    );
  }
}

export default Display;
