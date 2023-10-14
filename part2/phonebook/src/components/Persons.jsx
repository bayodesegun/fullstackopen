const Persons = ({persons, nameFilter, deletePerson}) => (
    <>
      {persons.filter(
          person => person.name.toLowerCase().includes(nameFilter.toLowerCase())
        ).map(person =>
          (<div key={person.id}>
            {person.name} {person.number} <button type="delete" onClick={() => deletePerson(person)}>delete</button>
          </div>)
        )
      }
    </>
)

export default Persons
