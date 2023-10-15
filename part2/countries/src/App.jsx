import {useState, useEffect} from 'react'
import countriesService from './services/countries'

import CountryList from './components/CountryList'
import Country from './components/Country'
import './App.css'

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  const getCountries = () => {
    countriesService
      .getAll()
      .then(data =>{
        setCountries(data)
        setFilteredCountries(data)
      })
  }
  useEffect(getCountries, [])

  // const updateFilter = () => {

  // }
  // useEffect(updateFilter, [filteredCountries])

  const filterCountries = (event) => {
    const filter = event.target.value.toLowerCase()
    setFilter(filter)
    const _filteredCountries = countries.filter(_country => _country.name.common.toLowerCase().includes(filter))
    setFilteredCountries(_filteredCountries)
    if (_filteredCountries.length === 1) {
      setCountry(_filteredCountries[0])
    } else {
      setCountry(null)
    }
  }

  return (
    <>
      <div>
        Find countries <input onChange={filterCountries} disabled={countries.length === 0} />
        { country !== null ?
          <Country country={country} />
          :
          <CountryList
            countriesToShow={filteredCountries}
            countriesCount={countries.length}
            filter={filter}
            setCountry={setCountry}
          />
        }
      </div>
    </>
  )
}

export default App
