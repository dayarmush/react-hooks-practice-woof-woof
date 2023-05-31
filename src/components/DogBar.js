function DogBar({ id, name, handleClick }) {

    return <span id={id} onClick={handleClick} >{name}</span>
}

export default DogBar