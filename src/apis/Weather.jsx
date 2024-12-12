import axios from "axios";

const Weather = async (lat, lon) => {
  const API_KEY = "8c97137670bb0a330ec95885a452aa08";
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;
  try {
    const response = await axios.get(url);
    return response.data; // 데이터를 반환
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error; // 에러를 던져 호출한 곳에서 처리
  }
};

export default Weather;
