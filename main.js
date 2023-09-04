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

    // call animateImages function here
    animateImages(iconUrl);

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

const animateImages = (iconUrl) => {
    // create a container for the images
    const iconContainer = document.querySelector('#icon-container');

    // remove any existing images in the container
    iconContainer.innerHTML = '';

    // get the position of the weatherDeetz element
    const weatherDeetz = document.querySelector('form');
    const weatherDeetzRect = weatherDeetz.getBoundingClientRect();

    // create 10 images and append them to the container
    for (let i = 0; i < 10; i++) {
        const img = document.createElement('img');
        img.src = iconUrl;
        img.classList.add('rain');
        img.style.position = 'absolute';
        img.style.left = `${weatherDeetzRect.left + weatherDeetzRect.width / 2}px`;
        img.style.top = `${weatherDeetzRect.top + weatherDeetzRect.height / 2}px`;
        iconContainer.appendChild(img);
    }

    // create the animation
    anime({
        targets: '.rain',
        translateY: [150, 0],
        translateX: (el, i) => anime.random(-300, 300),
        rotate: (el, i) => anime.random(0, 0),
        delay: anime.stagger(200),
        duration: 2000,
        loop: true
    });
}
