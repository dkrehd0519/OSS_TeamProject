import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "8c97137670bb0a330ec95885a452aa08";

  const getWeather = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;
    try {
      const response = await axios.get(url);
      const data = response.data;
      setWeatherData({
        city: data.name,
        weather: data.weather[0].description,
        temperature: data.main.temp,
        iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("날씨 정보를 가져오는데 실패했습니다.");
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  const onGeoOk = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getWeather(lat, lon);
  };

  const onGeoError = () => {
    setError("위치 접근 권한을 허용해주세요!");
    setLoading(false); // 로딩 상태 해제
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
  }, []);

  return (
    <Wrapper>
      {loading ? (
        <Message>Loading 중...</Message>
      ) : error ? (
        <Message>{error}</Message>
      ) : weatherData ? (
        <>
          <LeftContainer>
            <div>
              날씨: {weatherData.weather} / {weatherData.temperature}°C
            </div>
            <div>City: {weatherData.city}</div>
          </LeftContainer>
          <img src={weatherData.iconUrl} alt="Weather Icon" style={{ width: "50px", height: "50px" }} />
        </>
      ) : (
        <Message>날씨 데이터를 불러오지 못했습니다.</Message>
      )}
    </Wrapper>
  );
};

export default Weather;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Message = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: white;
  text-align: center;
`;
