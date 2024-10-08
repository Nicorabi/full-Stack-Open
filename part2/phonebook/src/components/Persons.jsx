import axios from 'axios'

function Persons({ filteredPersons, setPersons, persons, setNotificationMessage }) {
    const handleDelete = async (id, name) => {
        if (window.confirm(`Delete ${name}?`)) {
            try {
                await axios.delete(`http://localhost:3001/persons/${id}`)
                setPersons(persons.filter(person => person.id !== id))
                setNotificationMessage(`Deleted ${name}`)
                setTimeout(() => {
                    setNotificationMessage(null)
                }, 5000)
            } catch (error) {
                console.error(error)
            }
        }
    }

    return (
        <>
            {
                filteredPersons.map(person => (
                    <div key={person.id}>
                        {person.name} {person.number}
                        <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
                    </div>
                ))
            }
        </>
    )
}

export default Persons
