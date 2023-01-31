import { React, useReducer } from 'react';
import { Routes, Route, } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

//UI components
import NavBar from "./components/ui/NavBar"
import "./App.css";

//pages
import Home from "./components/pages/Home";
import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import Agencies from "./components/pages/AddProperty";
import Listings from "./components/pages/Listings";
import AddProperty from "./components/pages/AddProperty";
import Error from "./components/pages/Error";


//testing delete when done
import TestinguseReducer from "./components/testing/userReducerTesting";


function App() {
  return (
    <StyledEngineProvider injectFirst >
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-property" element={<AddProperty />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/agencies" element={<Agencies  />} />
        <Route path="/testing" element={<TestinguseReducer  />} />
        {/* ERROR PAGE SHOULD BE LAST ROUTE */}
        <Route path="*" element={<Error />} />
      </Routes>
    </StyledEngineProvider>
  );
}

export default App;
