import { useState } from 'react'
import Form from '/src/components/Form'
import Persons from '/src/components/Persons'
import Search from './components/Search'

function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filter, setFilter] = useState('')

  function addName(event) {
    event.preventDefault()
    if (persons.find(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`)
      return false;
    }

    const noteObject = {
      name: newName,
      number: newNumber,
      id: crypto.randomUUID()
    }

    setPersons([...persons, noteObject])
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
      <Search filter={filter} handleFilter={handleFilter} />
      <h2>add a new</h2>
      <Form newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        addName={addName} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </>
  )
}

export default App
