import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  
  constructor() {
    super();
    
  this.state = {
      pets: [],
      filters: {
        type: 'all',
      }
    }
  }

  onChangeType = (event) => {
    event.preventDefault()

    this.setState({
      filters: {...this.state.filters, type: event.target.value }
    });
  }

  onFindPetsClick = (event) => {
    let url;
    const petType = this.state.filters.type;

    if (this.state.filters.type === 'all') { url = '/api/pets' }
    else { url = `/api/pets?type=${petType}` }

    fetch(url)
    .then((resp) => resp.json())
    .then((data) => this.setState({ pets: data }))
  }

  onAdoptPet = (petId) => {
    const pets = this.state.pets.map((pet) => {
      return pet.id === petId ? { ...pet, isAdopted: true } : pet
    })

    this.setState({ pets })
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.changeType} onFindPetsClick={this.fetchPets} />
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
