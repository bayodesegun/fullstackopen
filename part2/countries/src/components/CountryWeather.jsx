const CountryWeather = ({weather}) => {
  const temp = (weather.main.temp * 0.1).toFixed(2)
  const windSpeed = weather.wind.speed
  const weatherIcon = weather.weather[0].icon
  return (
      <>
        <div>Temperature {temp} Celcius</div>
        <img
          src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          alt={'Weather image'}
        />
        <div>wind {`${windSpeed} m/s`}</div>
      </>
    )
}

export default CountryWeather
