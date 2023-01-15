import { Routes, Route } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

//UI components
import NavBar from "./UI/NavBar";
import "./App.css";

//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Listings from "./pages/Listings";



function App() {
  return (
    <StyledEngineProvider injectFirst >
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listings" element={<Listings />} />
      </Routes>
    </StyledEngineProvider>
  );
}

export default App;
