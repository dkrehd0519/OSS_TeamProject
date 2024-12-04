import axios from "axios";

const SearchCity = async (searchQuery) => {
  const API_KEY = "8c97137670bb0a330ec95885a452aa08";

  try {
    const serverResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchQuery},kr&appid=${API_KEY}&units=metric&lang=kr`
    );
    return serverResponse.data;
  } catch (error) {
    console.error("일지 불러오기 실패 ", error);
    throw error;
  }
};

export default SearchCity;
