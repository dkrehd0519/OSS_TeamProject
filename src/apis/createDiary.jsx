import axios from "axios";

const createDiary = async (formDataToSend) => {
  try {
    const serverResponse = await axios.post(`https://674e9de9635bad45618f3c1c.mockapi.io/Diarys`, formDataToSend);

    return serverResponse.data;
  } catch (error) {
    console.error("일지 만들기 실패 ", error);
    throw error;
  }
};

export default createDiary;
