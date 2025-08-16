const apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key

// Outfit mapping
const outfitSuggestions = {
    Clear: { text: "T-shirt, Sunglasses, Shorts", img: "https://i.imgur.com/HtKqJkO.png" },
    Clouds: { text: "Light Jacket, Jeans, Sneakers", img: "https://i.imgur.com/7kWgGdK.png" },
    Rain: { text: "Raincoat, Waterproof Boots, Umbrella", img: "https://i.imgur.com/8fswQjq.png" },
    Snow: { text: "Winter Coat, Gloves, Boots", img: "https://i.imgur.com/nH5aP4K.png" },
    Drizzle: { text: "Waterproof Jacket, Cap", img: "https://i.imgur.com/8fswQjq.png" },
    Thunderstorm: { text: "Rain Jacket, Boots, Stay Safe Indoors!", img: "https://i.imgur.com/mG8V7Xm.png" },
    Default: { text: "Comfortable Clothes", img: "https://i.imgur.com/udtH7uF.png" }
};

document.getElementById("getWeatherBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert("Please enter a city name");
    }
});

async function getWeather(city) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );
        const data = await response.json();

        if (data.cod === "404") {
            document.getElementById("weatherResult").innerHTML = `<p>City not found!</p>`;
            return;
        }

        const weatherCondition = data.weather[0].main;
        const temp = Math.round(data.main.temp);
        const cityName = data.name;
        const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        const outfit = outfitSuggestions[weatherCondition] || outfitSuggestions.Default;

        document.getElementById("weatherResult").innerHTML = `
            <h2>${cityName}</h2>
            <img src="${icon}" alt="${weatherCondition}">
            <p><strong>Condition:</strong> ${weatherCondition}</p>
            <p><strong>Temperature:</strong> ${temp}°C</p>
            <h3>Suggested Outfit</h3>
            <p>${outfit.text}</p>
            <img src="${outfit.img}" alt="Outfit Suggestion">
        `;
    } catch (error) {
        console.error(error);
        document.getElementById("weatherResult").innerHTML = `<p>Something went wrong!</p>`;
    }
}
