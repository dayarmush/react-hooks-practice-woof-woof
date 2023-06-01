import { useState } from "react"

function DogInfo({ displayDog, setDisplayDog, isGood, setIsGood, dogs}) {

  let dogValue;
  
  function handleGoodDog(e) {
    const id = parseInt(e.target.id)
    dogValue = dogs.find(dog => dog.id === id)

    if (dogValue.isGoodDog) {
      dogValue.isGoodDog = !dogValue.isGoodDog
    } else {
      dogValue.isGoodDog = !dogValue.isGoodDog
    }
    
    console.log(dogValue.isGoodDog)

    setIsGood(dogValue.isGoodDog)
    
    fetch(`http://localhost:3001/pups/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({'isGoodDog': dogValue.isGoodDog})
    })
    .then(r => r.json())
    .then(setDisplayDog(preDog => {
      return {...preDog, 'isGoodDog': dogValue.isGoodDog}
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