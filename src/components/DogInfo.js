import { useState } from "react"

function DogInfo({ displayDog, dogs, setDisplayDog, setDogs }) {

  const [isGood, setIsGood] = useState(displayDog.isGoodDog)

  function handleGoodDog(e) {
    const id = parseInt(e.target.id)
    const targetDog = dogs.find(dog => dog.id === id)
    
    fetch(`http://localhost:3001/pups/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({'isGoodDog': !targetDog.isGoodDog})
    })
    .then(r => r.json())
    .then(setIsGood(pre => !pre), setDisplayDog(preDog => {
      return {...preDog, 'isGoodDog': isGood}
    }))
  }

    return (
      <div>
        <img src={displayDog.image} />
        <h2>{displayDog.name}</h2>
        <button onClick={handleGoodDog} id={displayDog.id} >{displayDog.isGoodDog ? 'Good Dog' : 'Bad Dog'}</button>
      </div> 
    )
}

export default DogInfo