import { useEffect, useState } from "react";
import DogInfo from "./DogInfo";
import DogBar from "./DogBar";

function App() {

  const [dogs, setDogs] = useState([])
  const [displayDog, setDisplayDog] = useState([])
  const [isFilterOn, setIsFilterOn] = useState(false)
  const [isGood, setIsGood] = useState(true)
  
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

  let barDisplay;

  if (isFilterOn) {
    barDisplay = dogs
    .filter(dog => dog.isGoodDog === true)
    .map(dog => {
      return (
        <DogBar
          key={dog.id}
          id={dog.id}
          name={dog.name}
          handleClick={changeDisplay}
        />
      )
    })
  } else {
    barDisplay = dogs.map(dog => {
      return (
        <DogBar
          key={dog.id}
          id={dog.id}
          name={dog.name}
          handleClick={changeDisplay}
        />
      )
    })
  }
  

  function changeDisplay(e) {
    const id = parseInt(e.target.id)
    const getDisplayDog = dogs.find(dog => {
      return dog.id === id
    })
    setDisplayDog(getDisplayDog)
  }

  function handleFilter() {
    setIsFilterOn(pre => !pre)
  }

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={handleFilter}>Filter good dogs: {isFilterOn ? 'ON' : 'OFF'}</button>
      </div>
      <div id="dog-bar">
       {barDisplay}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          <DogInfo 
            displayDog={displayDog}
            setDisplayDog={setDisplayDog} 
            isGood={isGood} 
            setIsGood={setIsGood}
            dogs={dogs}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
