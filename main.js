const apiKey ='f9720521c9d98aa1a7825815f6fada71'


// cache form from html, and use .addEventListener & add event upon submit  
const cityForm = document.querySelector('form')
cityForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const cityName = cityForm[0].value
    cityData(cityName)
})



// now add fetch request
const cityData = async (name) => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&APPID=f9720521c9d98aa1a7825815f6fada71`,
    )
    const data = await response.json()
    console.log(data)
    const cityWeatherK = data.main.temp
    // need to convert k fo f ...use formula provided
    const convertTemp = (kelvin) => {
        return (kelvin - 273.15)* 9/5 + 32
    }
    const cityWeatherF = convertTemp(cityWeatherK).toFixed(1)
    // this returned a lot of decimal places. googled how to stop it at 1 is: .toFixed(1)
    const cityHighK = data.main.temp_max
    const cityLowK = data.main.temp_min
    // call convertTemp function again for high/low
    const cityHighF = convertTemp(cityHighK).toFixed(1)
    const cityLowF = convertTemp(cityLowK).toFixed(1)
    const cityForecast = data.weather[0].main
    const cityForecastDeetz = data.weather[0].description
    console.log(cityForecast)
    console.log(cityForecastDeetz)
    const cityHumi = data.main.humidity
    console.log(cityHumi)
    console.log(cityWeatherF)

    // get the icon code from the data
    const iconCode = data.weather[0].icon

    // use font awesome
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`

    // .innerHTML - to create the code
    weatherDeetz.innerHTML = `
    <h2>${data.name}</h2>

    <h3>Current Temp is: ${cityWeatherF}°F</h3>

    <h5>Today's High: ${cityHighF}°F</h5>
    <h5>Today's Low: ${cityLowF}°F</h5>

    <h6>The general forecast for today is: ${cityForecast} and its looking like it's, <img class="rain" src="${iconUrl}"> 
    ${cityForecastDeetz} outside.</h6>
    <h6>Humidity is at: ${cityHumi}% for the day.</h6>

    `

}


