import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Weather from "../../apis/Weather";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const data = await Weather(lat, lon);
            setWeatherData({
              city: data.name,
              weather: data.weather[0].description,
              temperature: data.main.temp,
              iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            });
            setError(null);
            setLoading(false);
          },
          (geoError) => {
            console.error("Error getting location:", geoError);
            setError("위치 정보를 가져오는데 실패했습니다.");
            setLoading(false);
          }
        );
      } catch (error) {
        console.error("Error fetching weather data:", error);
        setError("날씨 정보를 가져오는데 실패했습니다.");
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return (
    <Wrapper>
      <LeftContainer>
        <Logo onClick={() => navigate(`/`)}>Weather Diary</Logo>
        <h3 onClick={() => navigate(`/`)}>홈 화면</h3>
        <h3 onClick={() => navigate(`/list`)}>일기장</h3>
        <h3 onClick={() => navigate(`/WeatherList`)}>전국 날씨</h3>
      </LeftContainer>
      <WeatherWrapper>
        {loading ? (
          <Message>Loading 중...</Message>
        ) : error ? (
          <Message>{error}</Message>
        ) : weatherData ? (
          <>
            <WeatherContainer>
              <div>
                날씨: {weatherData.weather} / {weatherData.temperature}°C
              </div>
              <div>City: {weatherData.city}</div>
            </WeatherContainer>
            <img src={weatherData.iconUrl} alt="Weather Icon" style={{ width: "50px", height: "50px" }} />
          </>
        ) : (
          <Message>날씨 데이터를 불러오지 못했습니다.</Message>
        )}
      </WeatherWrapper>
    </Wrapper>
  );
}

export default Header;

const Wrapper = styled.div`
  width: 100vw;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 10px 30px;
  background-color: hsl(240deg 33.33% 14.12%);
  color: white;
`;

const LeftContainer = styled.div`
  display: flex;
  h3 {
    margin-left: 70px;
    cursor: pointer;
  }
`;

const Logo = styled.div`
  font-family: "PT Serif", serif;
  font-weight: 400;
  font-style: normal;
  font-size: 30px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const WeatherWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
`;

const WeatherContainer = styled.div`
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
