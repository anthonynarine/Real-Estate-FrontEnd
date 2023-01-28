import { Routes, Route } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

//UI components
import NavBar from "./components/UI/NavBar"
import "./App.css";

//pages
import Home from "./components/pages/Home";
import Agencies from "./components/pages/AddProperty";
import Listings from "./components/pages/Listings";
import AddProperty from "./components/pages/AddProperty";
import Error from "./components/pages/Error";
import Testing from "./components/Testing/Testing";


function App() {
  return (
    <StyledEngineProvider injectFirst >
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/agencies" element={<Agencies  />} />
        <Route path="/testing" element={<Testing  />} />
        {/* ERROR PAGE SHOULD BE LAST ROUTE */}
        <Route path="*" element={<Error />} />
      </Routes>
    </StyledEngineProvider>
  );
}

export default App;
