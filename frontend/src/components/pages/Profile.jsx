import { useNavigate } from "react-router-dom";
import { React, useEffect, useContext } from "react";
import StateContex from "../contex/StateContex";
import { useImmerReducer } from "use-immer";
import axios from "axios";



//FORM STYLE START\\
const Pstyling = {
  mainContainer: {
    positon: "absolute",
    border: "solid black",
    height: "200rem",
  },
};
//FORM STYLE END\\

const Profile = () => {

  const navigate  = useNavigate();
  const GlobalState = useContext(StateContex);


  //START STATE MANAGEMENT WITH IMMERREDUCER START \\
  const initialState = {
    userProfile: {
      agencyName: "",
      phoneNumber: "",
    },
  };

  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchUserProfileInfo":
        draft.userProfile.agencyName = action.profileObject.agency_name;
        draft.userProfile.phoneNumber = action.profileObject.phone_number;
        break;
    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  //START STATE MANAGEMENT WITH IMMERREDUCER END \\

   // REQUEST TO GET PROFILE INFO//
  // useEffect will run once when page loads
  useEffect(() => {
    async function GetProfileInfo() {
      try {
        // backticks w/ string inperpolation to grab the user's id from GlobalState
        const response = await axios.get(
          `http://localhost:8000/api/profiles/${GlobalState.userId}/`
        );
        console.log("DATA:", response.data);
        dispatch({
          type: "catchUserProfileInfo",
          profileObject: response.data,
          //value being caught 
        });
      } catch (error) {
        console.log(error.response);
      }
    }
    GetProfileInfo();
  }, []);

     // REQUEST TO GET PROFILE INFO//

  return <div>Profile Page</div>;
};

export default Profile;
