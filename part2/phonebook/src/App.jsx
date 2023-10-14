import { useState, useEffect } from 'react'
import axios from 'axios'

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

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

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
        number: newNumber,
        id: persons.length() + 1
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
