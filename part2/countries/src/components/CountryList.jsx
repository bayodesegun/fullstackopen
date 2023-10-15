const CountryList = ({countriesToShow, countriesCount, filter, setCountry}) => {

  if (countriesCount === 0) {
    return <div>Fetching countries data...</div>
  }
  if (filter === '') {
    return <div>Start typing to find a country</div>
  }
  if (countriesToShow.length > 10) {
    return <div>Too many matches, specify another filter.</div>
  } else if (countriesToShow.length === 0) {
    return <div>No matches!</div>
  } else {
    return (
      <>{
        countriesToShow.map(country =>
          (<div key={country.name.official}>
            {country.name.common} <button onClick={() => setCountry(country)}>show</button>
          </div>)
        )
      }
      </>
    )
  }
}

export default CountryList
