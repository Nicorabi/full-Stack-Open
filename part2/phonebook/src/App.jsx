import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from '/src/components/Form'
import Persons from '/src/components/Persons'
import Search from './components/Search'
import phonebookService from './services/phonebook'
import Notification from './components/notification'

function App() {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')

  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  function addName(event) {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      if (window.confirm(`${newName}' is already added to the phonebook, replace the old number with a new one?`)) {
        updateNumber(existingPerson.id)
      }
    } else {
      const noteObject = {
        name: newName,
        number: newNumber,
        id: crypto.randomUUID()
      }

      phonebookService.create(noteObject).then(returnedPerson => {
        setPersons([...persons, returnedPerson])
        setNotificationMessage(`Added ${newName} to phonebook`)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
    }
  }

  const updateNumber = async (id) => {
    const updatedPerson = {
      name: newName,
      number: newNumber,
      id: id
    }

    phonebookService.update(id, updatedPerson).then(returnedPerson => {
      setPersons(persons.map(person => person.id === id ? returnedPerson : person))
      setNotificationMessage(`Updated ${newName}'s number`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    })
  }


  function handleNameChange(event) {
    setNewName(event.target.value)
  }

  function handleNumberChange(event) {
    setNewNumber(event.target.value)
  }

  function handleFilter(event) {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <br />
      <Search filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <Form newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addName={addName} />
      <h2>Numbers</h2>
      <Persons
        filteredPersons={filteredPersons}
        setPersons={setPersons}
        persons={persons}
        setNotificationMessage={setNotificationMessage}
      />
    </>
  )
}

export default App
