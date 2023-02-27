/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import { React, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import StateContex from "../contex/StateContex";
import ProfileUpdate from "./ProfileUpdate";
import { useImmerReducer } from "use-immer";
import axios from "axios";

//FORM STYLE START\\
const pStyling = {
  welcomePaperStyle: {
    padding: "20px 20px",
    width: "40rem",
    marginTop: "30px",
    marginBottom: "20px",
    borderRadius: 3,
    // backgroundColor: "#f9f9f9",
    border: "solid #79B2BE ",
  },
  paperStyle: {
    padding: "40px 40px",
    width: "50rem",
    marginTop: "15px",
    borderRadius: 5,
    backgroundColor: "#FDFDFD",
    border: "solid #79B2BE",
  },
  btn: {
    backgroundColor: "#79B2BE",
    marginTop: "1.75rem",
    color: "white",
    fontSize: "1rem",
    width: "20rem",
    "&:hover": {
      bacgroundColor: "purple",
    },
  },
};
//FORM STYLE END\\

function Profile() {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContex);

  //START STATE MANAGEMENT WITH IMMERREDUCER START \\
  const initialState = {
    userProfile: {
      agencyName: "",
      phoneNumber: "",
      profilePic: "",
      bio: "",
    },
  };

  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchUserProfileInfo":
        draft.userProfile.agencyName = action.profileObject.agency_name;
        draft.userProfile.phoneNumber = action.profileObject.phone_number;
        draft.userProfile.profilePic = action.profileObject.profile_picture;
        draft.userProfile.bio = action.profileObject.bio;
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
        console.log("USERPROFILE:", response.data,);
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

 
  //FUNCTION WILL RENDER WELCOME MESSAGE AND ASK USER TO FIll OUT PROFILE FORM IF INCOMPLETE
  function WelcomeDisplay() {
    if (
      state.userProfile.agencyName === null ||
      state.userProfile.agencyName === "" ||
      state.userProfile.phoneNumber === null ||
      state.userProfile.phoneNumber === ""
    ) {
      return (
        <Grid item container spacing={1} direction="row" xs={12} justifyContent="center">
          <Typography
            variant="h5"
            sx={{ textAlign: "center", marginTop: ".5rem", color: "#141010" }}
          >
            Welcome {GlobalState.userUsername}
            Please complete the form below to complete your profile.
          </Typography>
        </Grid>
      );
    } else {
      return (
        <Grid item container rowSpacing={1} >
          <Grid item xs={6}>
            {/* Image currently not being displayed correctly */}{" "}
            <img
              style={{ height: "10rem", width: "15" }}
              src={state.userProfile.profilePic}
              alt="profile p"
            />
          </Grid>
          <Grid item xs={6} >
           <Typography variant="h5" >Aloha {GlobalState.userUsername} you currently have 90 properties</Typography> 
          </Grid>
        </Grid>
      );
    }
  }

  return (
    <Grid
      item
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Paper sx={pStyling.welcomePaperStyle} elevation={10}>
        {WelcomeDisplay()}
      </Paper>
      <Grid
        item
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
      >
      < ProfileUpdate userProfile={state.userProfile} />
      </Grid>
    </Grid>
  );
};

export default Profile;
