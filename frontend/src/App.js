/* eslint-disable react-hooks/exhaustive-deps */
import { React, useEffect } from "react";
import { useImmerReducer } from "use-immer";
import { Routes, Route } from "react-router-dom";

//UI components
import NavBar from "./components/ui/NavBar";
import "./App.css";

//pages
import Home from "./components/pages/Home";
import Login from "./components/forms/forms/Login"
import Register from "./components/forms/forms/Register";
import Profile from "./components/pages/Profile";
import AddProperty from "./components/forms/forms/AddProperty";
import Test from "./components/forms/forms/Test";
import Agencies from "./components/pages/Agencies";
import Listings from "./components/pages/Listings";
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
    userUsername: localStorage.getItem("theUserUsername"),
    userEmail: localStorage.getItem("theUserEmail"),
    userId: localStorage.getItem("theUserId"),
    userToken: localStorage.getItem("theUserToken"),
    userIsLoggedIn: localStorage.getItem("theUserUsername") ? true : false,
    // does the user name exist ? if that's the case userIsLogged in is true otherwise it's false. 
  };

  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchToken":
        draft.userToken = action.tokenValue;
        break;
      case "userSignsIn":
        draft.userUsername = action.usernameInfo;
        draft.userEmail = action.emailInfo;
        draft.userId = action.IdInfo;
        draft.userIsLoggedIn = true;
        break;
      
      case "logout":
        draft.userIsLoggedIn = false;
        break;
      
      


    }
  };
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  //START STATE MANAGEMENT WITH IMMERREDUCER END \\

  //this use effect hook will locally store the the state values listed below as to not lose this info on page refresh. see lecture 65 10:03 on conditional rendering
  useEffect(()=>{
    if(state.userIsLoggedIn){
      localStorage.setItem("theUserUserName", state.userUsername)
      localStorage.setItem("theUserEmail", state.userEmail)
      localStorage.setItem("theUserId", state.userId)
      localStorage.setItem("theUserToken", state.userToken)
    }
    else{
      localStorage.removeItem("theUserUserName");
      localStorage.removeItem("theUserEmail");
      localStorage.removeItem("theUserId");
      localStorage.removeItem("theUserToken");
    }

  }, [state.userIsLoggedIn])

  return (
    <StateContex.Provider value={state}>
      <DispatchContex.Provider value={dispatch}>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/addproperty" element={<AddProperty />} />
            <Route path="/test" element={<Test />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/agencies" element={<Agencies />} />
            <Route path="/testing" element={<TestinguseReducer />} />
            {/* ERROR PAGE SHOULD BE LAST ROUTE */}
            <Route path="*" element={<Error />} />
          </Routes>
      </DispatchContex.Provider>
    </StateContex.Provider>
  );
}

export default App;


// Local staragee Notes.
// The user information is inityally blank so every time the browser is refreshed , the user
// information becomes blank AutoGraphOutlined. Which is why the button in the navbar will 
// display login instead of the usernae. this problem is solved the initial values for These
// properties need to be taken from local storage 
