import "./App.css";
import { Routes, Route } from "react-router-dom";
import Items from "./components/Items/index.tsx";
import NavBar from "./components/NavBar/index.tsx";

function App() {
  return (
    <>
      <NavBar>
        <Routes>
          <Route path="/" index element={<Items />} />
        </Routes>
      </NavBar>
    </>
  );
}

export default App;
