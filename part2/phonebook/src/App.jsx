import { useState } from 'react'
import NameFilter from './components/NameFilter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

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
      <NameFilter
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
      />
      <h3>add a new</h3>
      <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addNewName={addNewName}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        nameFilter={nameFilter}
      />
    </div>
  )
}

export default App
