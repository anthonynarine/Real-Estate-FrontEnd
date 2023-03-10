/* eslint-disable react-hooks/exhaustive-deps */
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import defaultProfilePicture from "../assets/defaultProfilePicture.jpg";
import { React, useEffect, useContext } from "react";
import StateContex from "../contex/StateContex";
import { useNavigate } from "react-router-dom";
import ProfileUpdate from "./ProfileUpdate";
import { useImmerReducer } from "use-immer";
import { Container } from "@mui/system";
import axios from "axios";

//FORM STYLE START\\
const pStyling = {
  welcomePaperStyle: {
    padding: "20px 20px",
    width: "40rem",
    marginTop: "30px",
    marginBottom: "20px",
    borderRadius: 2,
    // backgroundColor: "#f9f9f9",
    border: "solid  #6C3082",
  },
  paperContainer: {
    padding: "40px 40px",
    height: "70rem",
    marginTop: "30px",
    marginBottom: "30px",
    backgroundColor: "#ffffff",
    border: "solid   #6C3082",
  },
  paperStyle: {
    padding: "20px 20px",
    width: "50rem",
    marginTop: "15px",
    borderRadius: 5,
    backgroundColor: "#FDFDFD",
    border: "solid #6C3082",
  },
  btn: {
    backgroundColor: "#6C3082",
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

//MAIN FUNCTION \\
function Profile() {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContex);

  //START STATE MANAGEMENT WITH IMMERREDUCER START \\
  const initialState = {
    userProfile: {
      agencyName: "",
      bio: "",
      phoneNumber: "",
      profilePic: "",
      sellerListings: [],
      sellerId: "",
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
        draft.userProfile.sellerListings = action.profileObject.seller_listings;
        draft.userProfile.sellerId = action.profileObject.seller;
        break;
      case "loadingDone":
        draft.dataIsLoading = false;
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
        console.log("USERPROFILE:", response.data);
        dispatch({
          type: "catchUserProfileInfo",
          profileObject: response.data,
          //value being caught
        });
        // dispatch used switching dataIsLoading on and off
        dispatch({ type: "loadingDone" });
      } catch (error) {
        console.log(error.response);
      }
    }
    GetProfileInfo();
  }, []);

  function PropertiesDisplay() {
    if (state.userProfile.sellerListings.length === 0) {
      return (
        <Button disabled size="small">
          No Listings
        </Button>
      );
    } else if (state.userProfile.sellerListings.length === 1) {
      return (
        <Button
          onClick={() => navigate(`/agencies/${state.userProfile.sellerId}`)}
          size="small"
        >
          1 Property listed
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => navigate(`/agencies/${state.userProfile.sellerId}`)}
          size="small"
        >
          {state.userProfile.sellerListings.length} Properties
        </Button>
      );
    }
  }

  //FUNCTION WILL RENDER WELCOME MESSAGE AND ASK USER TO FIll OUT PROFILE FORM IF INCOMPLETE
  function WelcomeDisplay() {
    if (
      state.userProfile.agencyName === null ||
      state.userProfile.agencyName === "" ||
      state.userProfile.phoneNumber === null ||
      state.userProfile.phoneNumber === ""
    ) {
      return (
        <Grid
          item
          container
          spacing={1}
          direction="row"
          xs={12}
          justifyContent="center"
        >
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
        <Grid item container rowSpacing={1}>
          <Grid item xs={6}>
            <img
              style={{
  //This color is called Rebecca purple https://www.color-name.com/trending-purple-colors
                border: "solid #663399",
                // borderWidth: "3px",
                // borderTopLeftRadius: "5px",
                // borderTopRightRadius: "5%",
                // borderBottomRightRadius: "5px",
                borderBottomLefttRadius: "20%",
                height: "200px",
                width: "200px",
                // borderRadius: "50%",
              }}
              //ternary condition to check if a user has uploaded a pic if not then the default pic will be assigned. slack://T04T0UTRERE/magic-login/4888690544902-51073be6b17f1a77b5ca38c5dcfc22da92aedb894a272f65133477c0a82823a8
              src={
                state.userProfile.profilePic !== null
                  ? state.userProfile.profilePic
                  : defaultProfilePicture
              }
              alt="profile p"
            />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">
              Welcome {GlobalState.userUsername} you currently have{" "}
              {PropertiesDisplay()}
            </Typography>
          </Grid>
        </Grid>
      );
    }
  }

  // Loading animation (very reusable)
  if (state.dataIsLoading === true) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ height: "85vh" }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  //MAIN FUNCTION RETRUN
  return (
    <Container>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Paper sx={pStyling.paperContainer} elevation={20}>
          <Grid
            item
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Paper sx={pStyling.welcomePaperStyle} elevation={24}>
              {WelcomeDisplay()}
            </Paper>
            <Grid
              item
              container
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
            >
              <ProfileUpdate userProfile={state.userProfile} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Container>
  );
}

export default Profile;
