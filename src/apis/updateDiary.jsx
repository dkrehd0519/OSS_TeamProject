import axios from "axios";

const updateDiary = async (formDataToSend, id) => {
  try {
    const serverResponse = await axios.put(`https://674e9de9635bad45618f3c1c.mockapi.io/Diarys/${id}`, formDataToSend);

    return serverResponse.data;
  } catch (error) {
    console.error("일지 수정 실패 ", error);
    throw error;
  }
};

export default updateDiary;
