function Persons({ filteredPersons }) {
    return (
        <>
            {
                filteredPersons.map(person => (
                    <div key={person.id}>
                        {person.name} {person.number}
                    </div>
                ))
            }
        </>
    )
}

export default Persons
