import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather'
const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getCountry = (name) => {
    const request = axios.get(`${baseUrl}/name/${name}`)
    return request.then(response => response.data)
}

const getWeather = (name) => {
    const request = axios.get(`${weatherUrl}?q=${name}&appid=${weatherApiKey}`)
    return request.then(response => response.data)
}

export default { getAll, getCountry, getWeather }
