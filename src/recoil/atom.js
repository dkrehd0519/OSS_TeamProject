import { atom } from "recoil";

export const weatherState = atom({
  key: "weatherState",
  default: {
    city: "",
    weatherType: "Clear",
    weather: "",
    temperature: "",
    iconUrl: "",
    cloud: "",
    wind: "",
    time: "",
  },
  effects: [
    ({ setSelf }) => {
      const fetchWeather = async () => {
        const API_KEY = "8c97137670bb0a330ec95885a452aa08";
        try {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=36.0847&lon=129.3946&appid=${API_KEY}&units=metric&lang=kr`;
          const response = await fetch(url);
          const data = await response.json();

          const { main, id } = data.weather[0];
          let weatherType = "Clear";
          if (id >= 200 && id <= 232) {
            weatherType = "Rainy";
          } else if (id >= 300 && id <= 321) {
            weatherType = "Rainy";
          } else if (id >= 500 && id <= 531) {
            weatherType = "Rainy";
          } else if (id >= 600 && id <= 622) {
            weatherType = "Snowy";
          } else if (id >= 801 && id <= 804) {
            weatherType = "Cloudy";
          } else if (id === 800) {
            weatherType = "Clear";
          }

          setSelf({
            city: data.name,
            weatherType,
            weather: data.weather[0].description,
            temperature: data.main.temp,
            iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            cloud: data.clouds.all,
            wind: data.wind.speed,
            time: data.dt,
          });
        } catch (error) {
          console.error("Failed to fetch initial weather data:", error);
        }
      };

      fetchWeather();
    },
  ],
});

export const fixedWeatherState = atom({
  key: "fixedWeatherState",
  default: {
    city: "",
    weatherType: "Clear",
    weather: "",
    temperature: "",
    iconUrl: "",
    cloud: "",
    wind: "",
    time: "",
  },
  effects: [
    ({ setSelf, onSet }) => {
      const key = "fixedWeatherState";
      const savedState = localStorage.getItem(key);
      if (savedState) {
        setSelf(JSON.parse(savedState));
      }

      onSet((newState) => {
        localStorage.setItem(key, JSON.stringify(newState));
      });

      const fetchWeather = async () => {
        const API_KEY = "8c97137670bb0a330ec95885a452aa08";
        try {
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=36.0847&lon=129.3946&appid=${API_KEY}&units=metric&lang=kr`;
          const response = await fetch(url);
          const data = await response.json();

          const { main, id } = data.weather[0];
          let weatherType = "Clear";
          if (id >= 200 && id <= 232) {
            weatherType = "Rainy";
          } else if (id >= 300 && id <= 321) {
            weatherType = "Rainy";
          } else if (id >= 500 && id <= 531) {
            weatherType = "Rainy";
          } else if (id >= 600 && id <= 622) {
            weatherType = "Snowy";
          } else if (id >= 801 && id <= 804) {
            weatherType = "Cloudy";
          } else if (id === 800) {
            weatherType = "Clear";
          }

          const newState = {
            city: data.name,
            weatherType,
            weather: data.weather[0].description,
            temperature: data.main.temp,
            iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            cloud: data.clouds.all,
            wind: data.wind.speed,
            time: data.dt,
          };

          setSelf(newState);
          localStorage.setItem(key, JSON.stringify(newState));
        } catch (error) {
          console.error("Failed to fetch initial weather data:", error);
        }
      };

      fetchWeather();
    },
  ],
});
