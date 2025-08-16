document.getElementById("getWeather").addEventListener("click", function () {
    const city = document.getElementById("city").value.trim();
    if (!city) {
        alert("Please enter a city name");
        return;
    }
    fetchWeather(city);
});

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

function displayWeather(data) {
    document.getElementById("weatherResult").innerHTML = `
        🌍 Location: ${data.name}, ${data.sys.country} <br>
        🌡️ Temperature: ${data.main.temp}°C <br>
        🌤️ Weather: ${data.weather[0].main}
    `;
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
}
