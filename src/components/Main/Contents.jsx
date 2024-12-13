import React, { useEffect, useState } from "react";
import Clear from "../../assets/background/Clear.webp";
import Rainy from "../../assets/background/Rainy.webp";
import Snowy from "../../assets/background/Snowy.webp";
import Cloudy from "../../assets/background/Cloudy.webp";
import { weatherState } from "../../recoil/atom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import SnowIcon from "../../assets/icon/snow.png";
import RainIcon from "../../assets/icon/storm.png";
import SunIcon from "../../assets/icon/sun.png";
import CloudIcon from "../../assets/icon/weather.png";
import SearchIcon from "@mui/icons-material/Search";
import { SearchCity } from "../../apis/SearchCity";
import { useSetRecoilState } from "recoil";

function Contents() {
  const { weatherType, city, weather, temperature, iconUrl, cloud, wind, time } = useRecoilValue(weatherState);
  const [isError, setIsError] = useState(false);

  console.log("time: " + time, cloud, wind);

  const backgroundImages = {
    Clear,
    Rainy,
    Snowy,
    Cloudy,
  };

  const [selectedBackground, setSelectedBackground] = useState();

  useEffect(() => {
    const newBackground = backgroundImages[weatherType];
    setSelectedBackground(newBackground);
  }, [weatherType]);

  const weatherIcons = {
    Clear: SunIcon,
    Rainy: RainIcon,
    Snowy: SnowIcon,
    Cloudy: CloudIcon,
  };

  const selectedIcon = weatherIcons[weatherType] || SunIcon;

  function formatTimeToKST(utcSeconds) {
    const date = new Date((utcSeconds - 3600) * 1000);

    const kstDate = new Date(date.getTime() + 60 * 60 * 1000);

    const year = kstDate.getFullYear();
    const month = (kstDate.getMonth() + 1).toString().padStart(2, "0");
    const day = kstDate.getDate().toString().padStart(2, "0");

    const hours = kstDate.getHours().toString().padStart(2, "0");
    const minutes = kstDate.getMinutes().toString().padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  }

  const kstTime = formatTimeToKST(time);

  console.log("한국 시간 (KST):", kstTime);

  const cloudiness = getCloudiness(cloud);
  const windiness = getWindiness(wind);

  function getCloudiness(clouds) {
    if (clouds === 0) return "없음";
    if (clouds <= 25) return "적음";
    if (clouds <= 50) return "부분적으로 있음";
    if (clouds <= 75) return "많음";
    return "매우 많음";
  }

  function getWindiness(windSpeed) {
    if (windSpeed <= 0.5) return "고요";
    if (windSpeed <= 5.5) return "약한 바람";
    if (windSpeed <= 10.8) return "적당한 바람";
    if (windSpeed <= 17.2) return "강한 바람";
    return "매우 강한 바람";
  }

  const [searchQuery, setSearchQuery] = useState("");
  const setWeatherState = useSetRecoilState(weatherState);

  const SearchEnterHandle = (e) => {
    if (e.key === "Enter") {
      const fetchSearchedDiary = async () => {
        try {
          const fetchedSearch = await SearchCity(searchQuery);
          const { id, main } = fetchedSearch.weather[0];
          let weatherType = "";

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
          setWeatherState({
            weatherType,
            city: fetchedSearch.name,
            weather: fetchedSearch.weather[0].description,
            temperature: fetchedSearch.main.temp,
            iconUrl: `https://openweathermap.org/img/wn/${fetchedSearch.weather[0].icon}@2x.png`,
            cloud: fetchedSearch.clouds.all,
            wind: fetchedSearch.wind.speed,
            time: fetchedSearch.dt,
          });
          setIsError(false);
        } catch (error) {
          console.error("검색한 일지를 가져오는데 실패함: ", error);
          setIsError(true);
        }
      };
      fetchSearchedDiary();
      setSearchQuery("");
    }
  };

  return (
    <Wrapper
      style={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${selectedBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Searchbar>
        <SearchIcon />
        <input
          className="search-bar"
          placeholder={isError ? "잘못된 도시명을 입력하셨습니다." : "한국의 도시를 영어로 검색해보세요.    ex) seoul"}
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
          onKeyDown={(e) => SearchEnterHandle(e)}
        />
      </Searchbar>
      <WeaderWrapper>
        <TopContainer>
          <h2>{city}</h2>
          <p>{kstTime}</p>
        </TopContainer>
        <MiddleContainer>
          <div>{temperature}°C</div>
          <img src={selectedIcon} alt="Weather Icon" style={{ width: "120px", height: "120px", marginRight: "20px" }} />
        </MiddleContainer>
        <BottomContainer>
          <p>{weather}</p>
          <p>
            구름: {cloudiness}•바람: {windiness}
          </p>
        </BottomContainer>
      </WeaderWrapper>
    </Wrapper>
  );
}

export default Contents;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const WeaderWrapper = styled.div`
  width: 550px;
  height: 350px;
  background-color: white;
  border-radius: 30px;
  padding: 15px 25px;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
`;

const TopContainer = styled.div`
  p {
    color: #8c8c8c;
  }
`;

const MiddleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 40px;
  div {
    font-size: 67px;
  }
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Searchbar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 12px;
  border-radius: 8px;
  height: 50px;
  background-color: #f5f5f5;
  padding-left: 22px;
  width: 550px;
  --tw-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

  > svg {
    font-size: 20px;
    color: gray;
  }
  .search-bar {
    margin-left: 5px;
    width: 92%;
    height: 90%;
    outline: none;
    border: none;
    background-color: #f5f5f5;
  }
`;
