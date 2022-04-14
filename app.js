const resultsList = document.querySelector("#results");
const cityState = document.querySelector("#cityState");
const searchForm = document.querySelector("#searchForm");
const units = document.querySelector("#units")
const weatherCards = document.querySelector("#weatherCards")

const getWeather = async (city, state) => {
    const res = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&limit=1&appid=a72db7aa57e5920ebe217adb60359a27`)
    const {lat, lon} = res.data[0]
    const weather = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=a72db7aa57e5920ebe217adb60359a27`)
    console.log(weather)
    return weather
}

const makeCard = (weather) => {
    const newCard = document.createElement('DIV');
    newCard.classList = "card mb-3 mx-3"
    
    const cardBody = document.createElement('DIV');
    cardBody.classList = "card-body";
    
    const description = document.createElement('H5');
    description.classList = "card-title"
    
    const city = document.createElement('H4');
    city.classList = "card-title"
    
    const temp = document.createElement('H2');
    temp.classList = "card-title"
    
    const graphic = document.createElement('P');
    graphic.classList = "card-title"
    const weatherCode = weather.data.weather[0].id 

    const button = document.createElement('BUTTON');
    const cityName = weather.data.name
    button.classList = "btn btn-outline-light btn-sm mt-3 px-4"
    button.append('Remove')
    button.addEventListener('click', (e) => {
        localStorage.removeItem(cityName)
        button.parentElement.parentElement.remove()
    })
    

    description.innerText = weather.data.weather[0].description.replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())));
    graphic.innerHTML = `<i class="wi wi-owm-${weatherCode}"></i>`
    temp.innerHTML = `${Math.round(weather.data.main.temp)}&#176;`
    city.append(weather.data.name);
   
    cardBody.append(description)
    cardBody.append(graphic)
    cardBody.append(temp)
    cardBody.append(city)
    cardBody.append(button)
    
    newCard.append(cardBody);
    weatherCards.append(newCard);
}

cityState.addEventListener('submit', async (event) => {
    event.preventDefault();
    const city = cityState.elements.city.value
    const state = cityState.elements.state.value
    const weather = await getWeather(city,state);
    localStorage.setItem(`${weather.data.name}`,`${state}`)
    makeCard(weather);
})
const populate = async () =>{
    for (let item of Object.entries(localStorage)) {
        const weather = await getWeather(item[0],item[1])
        makeCard(weather);
    }
} 

populate();


