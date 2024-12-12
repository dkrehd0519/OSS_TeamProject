import axios from "axios";

const deleteDiary = async (id) => {
  try {
    const serverResponse = await axios.delete(`https://674e9de9635bad45618f3c1c.mockapi.io/Diarys/${id}`);

    return serverResponse.data;
  } catch (error) {
    console.error("일지 불러오기 실패 ", error);
    throw error;
  }
};

export default deleteDiary;
