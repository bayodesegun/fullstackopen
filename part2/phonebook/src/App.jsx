import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  const addNewName = (event) => {
    event.preventDefault()
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    setPersons(persons.concat(
      {
        name: newName
      }
    ))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          <button type="submit" onClick={addNewName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person =>
        (<div key={person.name}>
          {person.name}
        </div>)
      )}
    </div>
  )
}

export default App
