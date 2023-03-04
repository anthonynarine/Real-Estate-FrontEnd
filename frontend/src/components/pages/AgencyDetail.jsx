
//this page will display all the listings of a user.
// see app.js for path and route syntax and how the users id is used.
// useParms hook will be used along withe the async function to acces 
// the user id


/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Paper, TextField, Typography, Button, CircularProgress,} from "@mui/material";
import { React, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StateContex from "../contex/StateContex";
import { useImmerReducer } from "use-immer";
import axios from "axios";



function AgencyDetail(){

    const navigate = useNavigate();
    const GlobalState = useContext(StateContex);

    const params = useParams();

    console.log("useParams TEST", useParams())

  
    //START STATE MANAGEMENT WITH IMMERREDUCER START \\
    const initialState = {
      userProfile: {
        agencyName: "",
        bio: "",
        phoneNumber: "",
        profilePic: "",
        sellerListings: [],
      },
  //dataIsLoading state will initially be true
  //  then will become false when we get the data 
      dataIsLoading: true, 
  // datais loading is use with all get requests as always.         
    };
  
    function ReducerFunction(draft, action) {
      // eslint-disable-next-line default-case
      switch (action.type) {
        case "catchUserProfileInfo":
          draft.userProfile.agencyName = action.profileObject.agency_name;
          draft.userProfile.phoneNumber = action.profileObject.phone_number;
          draft.userProfile.profilePic = action.profileObject.profile_picture;
          draft.userProfile.bio = action.profileObject.bio;
          draft.userProfile.sellerListings = action.profileObject.seller_listings
          break;
        case "loadingDone":
          draft.dataIsLoading = false
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
            `http://localhost:8000/api/profiles/${params.id}/`
          );
          console.log("useParms Hook :", response.data,);
          dispatch({
            type: "catchUserProfileInfo",
            profileObject: response.data,
            //value being caught
          });
  // dispatch used switching dataIsLoading on and off
          dispatch( { type: "loadingDone" })
        } catch (error) {
          console.log(error.response);
        }
      }
      GetProfileInfo();
    }, []);


    return(
        <div>
            Agency Detail test
        </div>
    )
};

export default AgencyDetail;