import React from 'react';
import './App.css';
import Dog from './Dog';

class App extends React.Component {
  state = {
    pups: [],
    dogClicked: {},
    goodDogsToggle: false
  }

  componentDidMount() {
    fetch('http://localhost:3000/pups')
      .then(response => response.json())
      .then(pups => this.setState({ pups }))
      .catch(err => alert(err))
  }

  clickedDog = (dog) => {
    console.log(dog)
    this.setState({
      dogClicked: dog
    })
  }

  toggleBehavior = (event) => {
    event.persist()
    let goodPup = !this.state.dogClicked.isGoodDog
    let URL = `http://localhost:3000/pups/${this.state.dogClicked.id}`

    fetch(URL, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        isGoodDog: goodPup
      })
    })
    .then(response => response.json())
    .then(updatedPup => {
      this.setState({
        dogClicked: updatedPup
      })
    })
  }

  toggleFilter = () => {
    this.setState({
      goodDogsToggle: !this.state.goodDogsToggle
    })
  }

  renderdogs = () => {
    if (this.state.goodDogsToggle) {
      return this.state.pups.filter(dog => dog.isGoodDog === true).map(dog => <Dog key={dog.id} dog={dog} handleClick={this.clickedDog} />)
    } else {
      return this.state.pups.map(dog => <Dog key={dog.id} dog={dog} handleClick={this.clickedDog} />)
    }
  }

  render () {
    const dog = this.state.dogClicked

    return (
      <div className="App">
        <div id="filter-div">
          <button id="good-dog-filter" onClick={this.toggleFilter}>Filter good dogs: {this.state.goodDogsToggle ? 'ON' : 'OFF'} </button>
        </div>

        <div id="dog-bar">
          {this.renderdogs()}
        </div>

        <div id="dog-summary-container">
          <h1>DOGGO:</h1>
          <div id="dog-info">
            <img src={dog.image} alt='a good boy' />
            <h2>{dog.name}</h2>
            <button onClick={this.toggleBehavior}>{dog.isGoodDog ? "Good Dog" : "Bad Dog"}</button>
          </div>
        </div>
      </div>
    );
  }
  

}
export default App;
