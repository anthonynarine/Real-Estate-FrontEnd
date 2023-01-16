import { Routes, Route } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

//UI components
import NavBar from "./UI/NavBar";
import "./App.css";

//pages
import Home from "./pages/Home";
import Agencies from "./pages/AddProperty";
import Listings from "./pages/Listings";
import AddProperty from "./pages/AddProperty";



function App() {
  return (
    <StyledEngineProvider injectFirst >
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/agencies" element={<Agencies  />} />
      </Routes>
    </StyledEngineProvider>
  );
}

export default App;
