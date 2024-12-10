import axios from "axios";

const API_KEY = "8c97137670bb0a330ec95885a452aa08";

export const SearchCity = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},kr&appid=${API_KEY}&units=metric&lang=kr`
    );
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch weather for ${city}:`, error);
    throw error;
  }
};

export const fetchWeatherForCities = async (cities) => {
  const weatherData = await Promise.all(
    cities.map(async (city) => {
      try {
        const data = await SearchCity(city);
        return {
          city: data.name,
          temperature: data.main.temp,
          weather: data.weather[0].description,
          cloud: `${data.clouds.all}%`,
          wind: `${data.wind.speed} m/s`,
        };
      } catch (error) {
        return { city, error: true };
      }
    })
  );
  return weatherData;
};
