const Country = ({country}) => {

return (
    <>
      <h2>{country.name.common}</h2>
      <div>Capital {country.capital.join('')}</div>
      <div>Area {country.area}</div>
      <p>
        <b>Languages:</b>
      </p>
      <ul>
        {Object.values(country.languages).map(lang =>
          (<li key={lang}>{lang}</li>)
        )}
      </ul>
      <img alt={country.flags.alt} src={country.flags.png} />
    </>
  )
}

export default Country
