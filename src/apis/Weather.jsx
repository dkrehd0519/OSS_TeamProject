import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Weather = () => {
  const [weatherData, setWeatherData] = useState({
    city: "",
    weather: "",
    temperature: "",
    iconUrl: "",
  });
  const API_KEY = "8c97137670bb0a330ec95885a452aa08";

  const getWeather = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      console.log(data);
      setWeatherData({
        city: data.name,
        weather: data.weather[0].description,
        temperature: data.main.temp,
        iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      });
      const { main, id } = response.data.weather[0];
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data.");
    }
  };

  const onGeoOk = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon);
  };

  const onGeoError = () => {
    alert("Can't find your location. No weather information available.");
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  }, []);

  return (
    <div id="weather">
      <Wrapper>
        <LeftContainer>
          <div>
            날씨 : {weatherData.weather} / {weatherData.temperature}°C{" "}
          </div>
          <div>City: {weatherData.city}</div>
        </LeftContainer>
        <img src={weatherData.iconUrl} alt="Weather Icon" style={{ width: "50px", height: "50px" }} />
      </Wrapper>
    </div>
  );
};

export default Weather;

const Wrapper = styled.div`
  display: flex;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
