import { useEffect, useState } from "react";
import DogInfo from "./DogInfo";
import DogBar from "./DogBar";

function App() {

  const [dogs, setDogs] = useState([])
  const [displayDog, setDisplayDog] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/pups')
    .then(r => r.json())
    .then(dogData => {
      setDogs(dogData) 
      setDisplayDog(dogData[0])
    })
  }, [])

  if (!dogs) return <h3>Loading...</h3>
  if (!displayDog) return <h3>Loading...</h3>

  const barDisplay = dogs.map(dog => {
    return (
      <DogBar
        key={dog.id}
        id={dog.id}
        name={dog.name}
        handleClick={changeDisplay}
      />
    )
  })

  function changeDisplay(e) {
    const id = parseInt(e.target.id)
    const getDisplayDog = dogs.find(dog => {
      return dog.id === id
    })
    setDisplayDog(getDisplayDog)
  }

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter">Filter good dogs: OFF</button>
      </div>
      <div id="dog-bar">
       {barDisplay}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          <DogInfo displayDog={displayDog} dogs={dogs} setDisplayDog={setDisplayDog} setDogs={setDogs} />
        </div>
      </div>
    </div>
  );
}

export default App;
