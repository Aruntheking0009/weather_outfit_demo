document.getElementById("getWeather").addEventListener("click", function () {
    const city = document.getElementById("city").value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }
    fetchWeather(city);
});

document.getElementById("geoBtn").addEventListener("click", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        });
    } else alert("Geolocation not supported");
});

// Documentation followed: https://openweathermap.org/current
async function fetchWeather(city) {
    const apiKey = "7b0eb6123284d815d1e046643e08aec7"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();

        displayWeather(data);
        suggestOutfit(data.main.temp, data.weather[0].main);
    } catch (error) {
        document.getElementById("weatherResult").innerText = error.message;
        document.getElementById("outfitSuggestion").innerText = "";
    }
}

async function fetchWeatherByCoords(lat, lon){
    const apiKey = "7b0eb6123284d815d1e046643e08aec7"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try{
        const response = await fetch(url);
        if(!response.ok) throw new Error("Unable to fetch location weather");
        const data = await response.json();
        displayWeather(data);
        suggestOutfit(data.main.temp, data.weather[0].main);
    }catch(err){
        alert(err.message);
    }
}

function displayWeather(data) {
    document.getElementById("weatherResult").innerHTML = `
        🌍 Location: ${data.name}, ${data.sys.country} <br>
        🌡️ Temperature: ${data.main.temp}°C <br>
        🌤️ Weather: ${data.weather[0].main} <br>
        💧 Humidity: ${data.main.humidity}% | 🌬️ Wind: ${data.wind.speed} m/s
    `;
    document.getElementById("weatherResult").classList.add("show");
    setDynamicBackground(data.weather[0].main);
}

function suggestOutfit(temp, weatherCondition) {
    let suggestion = "";

    if (temp < 10) {
        suggestion = "🧥 It's cold! Wear a warm coat, scarf, and gloves.";
    } else if (temp >= 10 && temp < 20) {
        suggestion = "🧶 Cool weather. A sweater or light jacket will be perfect.";
    } else if (temp >= 20 && temp < 30) {
        suggestion = "👕 Warm day! T-shirt and jeans or shorts will do.";
    } else {
        suggestion = "🩳 It's hot! Wear light clothing and stay hydrated.";
    }

    if (weatherCondition.toLowerCase().includes("rain")) {
        suggestion += " ☔ Don't forget an umbrella!";
    } else if (weatherCondition.toLowerCase().includes("snow")) {
        suggestion += " ❄️ Wear snow boots and warm layers!";
    }

    document.getElementById("outfitSuggestion").innerText = suggestion;
    document.getElementById("outfitSuggestion").classList.add("show");
}

// Background changes based on weather
function setDynamicBackground(condition) {
    switch(condition.toLowerCase()) {
        case 'clear':
            document.body.style.background = 'linear-gradient(to right, #fddb92, #d1fdff)';
            break;
        case 'clouds':
            document.body.style.background = 'linear-gradient(to right, #d7d2cc, #304352)';
            break;
        case 'rain':
        case 'drizzle':
        case 'thunderstorm':
            document.body.style.background = 'linear-gradient(to right, #4e54c8, #8f94fb)';
            createRain();
            break;
        case 'snow':
            document.body.style.background = 'linear-gradient(to right, #e6dada, #274046)';
            createSnow();
            break;
        default:
            document.body.style.background = 'linear-gradient(to right, #83a4d4, #b6fbff)';
    }
}

// Snow animation
function createSnow(){
    for(let i=0;i<30;i++){
        const snow = document.createElement('div');
        snow.classList.add('snowflake');
        snow.style.left = Math.random()*100 + 'vw';
        snow.style.animationDuration = (3+Math.random()*5)+'s';
        snow.style.fontSize = (10+Math.random()*20)+'px';
        snow.innerText = '❄';
        document.body.appendChild(snow);
        setTimeout(()=>snow.remove(), 8000);
    }
}

// Rain animation
function createRain(){
    for(let i=0;i<30;i++){
        const rain = document.createElement('div');
        rain.classList.add('snowflake');
        rain.style.left = Math.random()*100 + 'vw';
        rain.style.animationDuration = (1+Math.random()*2)+'s';
        rain.style.fontSize = '10px';
        rain.innerText = '💧';
        document.body.appendChild(rain);
        setTimeout(()=>rain.remove(), 3000);
    }
}
