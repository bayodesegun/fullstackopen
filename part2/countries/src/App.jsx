import {useState, useEffect} from 'react'
import countriesService from './services/countries'

import CountryList from './components/CountryList'
import Country from './components/Country'
import './App.css'

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState(null)
  const [weather, setWeather] = useState(null)
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

  const filterCountries = (event) => {
    const filter = event.target.value.toLowerCase()
    setFilter(filter)
    const _filteredCountries = countries.filter(_country => _country.name.common.toLowerCase().includes(filter))
    setFilteredCountries(_filteredCountries)
    if (_filteredCountries.length === 1) {
      setCountryAndWeather(_filteredCountries[0])
    } else {
      setCountry(null)
    }
  }

  const setCountryAndWeather = (country) => {
    setCountry(country)
    countriesService
      .getWeather(country.capital[0])
      .then(data => {
        setWeather(data)
      })
  }

  return (
    <>
      <div>
        Find countries <input onChange={filterCountries} disabled={countries.length === 0} />
        { country !== null ?
          <Country country={country} weather={weather} />
          :
          <CountryList
            countriesToShow={filteredCountries}
            countriesCount={countries.length}
            filter={filter}
            setCountry={setCountryAndWeather}
          />
        }
      </div>
    </>
  )
}

export default App
