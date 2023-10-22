import { useState, useEffect } from 'react'
import personService from './services/persons'

import NameFilter from './components/NameFilter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  const hook = () => {
    personService
      .getAll()
      .then(allPersons => {
        setPersons(allPersons)
      })
  }
  useEffect(hook, [])

  const showNotification = (message, type) => {
    setMessageType(type)
    setMessage(message)
    setTimeout(() => setMessage(null), 5000)
  }

  const updatePersonNumber = (currentPerson, newNumber) => {
    if (confirm(`${newName} is already added to the phonebook. Replace the old number with a new one?`)) {
      const updatedPerson = {...currentPerson, number: newNumber}
      personService
        .update(currentPerson.id, updatedPerson)
        .then(personResponse => {
          setPersons(persons.map(person => person.id === currentPerson.id ? personResponse : person))
          showNotification(`Updated ${currentPerson.name}'s number to ${newNumber}.`, 'success')
        })
        .catch(error => {
          showNotification(error.response.data.error, 'error')
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
        showNotification(`Added ${newName} (${newNumber}) to the phonebook.`, 'success')
      })
      .catch(error => {
        showNotification(error.response.data.error, 'error')
      })
  }

  const deletePerson = (personToDelete) => {
    if (confirm(`Delete ${personToDelete.name}?`)) {
      personService
        .destroy(personToDelete.id)
        .then( noContent => {
          console.log('Content is', noContent)
          setPersons(persons.filter(person => person.id !== personToDelete.id))
          showNotification(`Deleted ${personToDelete.name} from the phonebook.`, 'success')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />
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
