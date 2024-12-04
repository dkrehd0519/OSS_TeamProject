import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import { RecoilRoot } from "recoil";
import List from "./components/list/List";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
