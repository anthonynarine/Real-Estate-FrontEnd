import { React } from "react";
import { useImmerReducer } from "use-immer";
import { Routes, Route } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";

//UI components
import NavBar from "./components/ui/NavBar";
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

// Context
import DispatchContex from "./components/contex/DispatchContex";
import StateContex from "./components/contex/StateContex";

function App() {
  //START STATE MANAGEMENT WITH IMMERREDUCER START \\
  //this state below will be accessible to all child component. this is done via context provider (see Dispatch context).
  //this was set up as helperfunctionality to the login/userName display button (see NavBar)
  //Dispatch contex will wrap all components below to allow acces to the initial state listed below
  const initialState = {
    userUsername: "",
    userEmail: "",
    userId: "",
    userToken: "",
    globalMessage: "This message can be used by any child comp."
  };

  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchToken":
        draft.userToken = action.tokenValue;
        break;
      case "catchUserInfo":
        draft.userUsername = action.usernameInfo;
        draft.userEmail = action.emailInfo;
        draft.userId = action.IdInfo;
        break;
    }
  };
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  //START STATE MANAGEMENT WITH IMMERREDUCER END \\

  return (
    <StateContex.Provider value={state}>
      <DispatchContex.Provider value={dispatch}>
        <StyledEngineProvider injectFirst>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/add-property" element={<AddProperty />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/agencies" element={<Agencies />} />
            <Route path="/testing" element={<TestinguseReducer />} />
            {/* ERROR PAGE SHOULD BE LAST ROUTE */}
            <Route path="*" element={<Error />} />
          </Routes>
        </StyledEngineProvider>
      </DispatchContex.Provider>
    </StateContex.Provider>
  );
}

export default App;
