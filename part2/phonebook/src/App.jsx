import { useState, useEffect } from 'react'
import personService from './services/persons'

import NameFilter from './components/NameFilter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(allPersons => setPersons(allPersons))
  }
  useEffect(hook, [])

  const updatePersonNumber = (currentPerson, newNumber) => {
    if (confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
      const updatedPerson = {...currentPerson, number: newNumber}
      personService
        .update(currentPerson.id, updatedPerson)
        .then(personResponse => {
          setPersons(persons.map(person => person.id === currentPerson.id ? personResponse : person))
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (newName === '') {
      alert('Please enter a name!')
      return
    }
    if (newNumber === '') {
      alert('Please enter a number!')
      return
    }
    const thisPerson = persons.find(person => person.name === newName)
    if (thisPerson) {
      // Same name but a different number?
      if (newNumber !== '' && thisPerson.number !== newNumber) {
        updatePersonNumber(thisPerson, newNumber)
      } else {
        alert(`${newName} is already added to the phonebook.`)
      }
      return
    }
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService
      .create(newPerson)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
      })
  }

  const deletePerson = (personToDelete) => {
    if (confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .destroy(personToDelete.id)
        .then( noContent => {
          console.log('Content is', noContent)
          setPersons(persons.filter(person => person.id !== personToDelete.id))
        })
    }
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
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <Persons
        persons={persons}
        nameFilter={nameFilter}
        deletePerson={deletePerson}
      />
    </div>
  )
}

export default App
