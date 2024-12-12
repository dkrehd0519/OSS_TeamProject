import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import { RecoilRoot } from "recoil";
import List from "./components/diaryPage/list/List";
import WeatherListPage from "./components/weather/WeatherListPage";
import CreateDiaryPage from "./components/diaryPage/createDiary/CreateDiaryPage";
import DiaryDetailPage from "./components/diaryPage/diaryDetail/DiaryDetailPage";
import UpdateDiaryPage from "./components/diaryPage/updateDiary/UpdateDiaryPage";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/list" element={<List />} />
          <Route path="/WeatherList" element={<WeatherListPage />} />
          <Route path="/createDiary" element={<CreateDiaryPage />} />
          <Route path="/diaryDetail/:id" element={<DiaryDetailPage />} />
          <Route path="/updateDiary/:id" element={<UpdateDiaryPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
