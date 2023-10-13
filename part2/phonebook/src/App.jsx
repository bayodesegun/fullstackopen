import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '08012345678'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const addNewName = (event) => {
    event.preventDefault()
    if (newName === '') {
      alert('Please enter a name!')
      return
    }
    if (newNumber === '') {
      alert('Please enter a number!')
      return
    }
    if (persons.filter(person => person.name === newName).length > 0) {
      alert(`${newName} is already added to the phonebook`)
      return
    }
    setPersons(persons.concat(
      {
        name: newName,
        number: newNumber
      }
    ))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={nameFilter} onChange={(ev) => setNameFilter(ev.target.value)} />
      </div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={(event) => setNewName(event.target.value)} />
        </div>
        <div>
          number: <input value={newNumber} onChange={(event) => setNewNumber(event.target.value)} />
        </div>
        <div>
          <button type="submit" onClick={addNewName}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(
          person => person.name.toLowerCase().includes(nameFilter.toLowerCase())
        ).map(person =>
          (<div key={person.name}>
            {person.name} {person.number}
          </div>)
        )
      }
    </div>
  )
}

export default App
