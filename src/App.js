import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import { RecoilRoot } from "recoil";
import List from "./components/diaryPage/list/List";
import WeatherListPage from "./components/weather/WeatherListPage";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/list" element={<List />} />
          <Route path="/WeatherList" element={<WeatherListPage />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
