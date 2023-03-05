//this page will display all the listings of a user.
// see app.js for path and route syntax and how the users id is used.
// useParms hook will be used along withe the async function to acces
// the user id

/* eslint-disable react-hooks/exhaustive-deps */
import {
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
  CircularProgress,
  IconButton,
  Card,
  CardMedia,
  CardActions,
  CardContent,
} from "@mui/material";
import defaultProfilePicture from "../assets/defaultProfilePicture.jpg";
import { Call } from "@mui/icons-material";
import { React, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StateContex from "../contex/StateContex";
import { useImmerReducer } from "use-immer";
import axios from "axios";

//FORM STYLE START\\
const ADStyling = {
  welcomePaperStyle: {
    padding: "20px 20px",
    width: "33rem",
    marginTop: "50px",
    marginBottom: "20px",
    borderRadius: 2,
    // backgroundColor: "#f9f9f9",
    border: "solid #79B2BE",
  },
  paperContainer: {
    padding: "40px 40px",
    height: "30rem",
    marginTop: "30px",
    marginBottom: "30px",
    backgroundColor: "#ffffff",
    border: "solid #79B2BE",
  },
  listingsContainer: {
    marginTop: "2rem",
  },
};

function AgencyDetail() {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContex);

  const params = useParams();

  console.log("useParams TEST", useParams());

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
        draft.userProfile.sellerListings = action.profileObject.seller_listings;
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
          `http://localhost:8000/api/profiles/${params.id}/`
        );
        console.log("TEST userProfile DATA:", state.userProfile);
        console.log("TEST userProfile.sellerlistings DATA:", state.userProfile.sellerListings);
        console.log("TESTING useParms Hook :", response.data);
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

  // Loading animation (very reusable)
  //Used with async/ await get requests.
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

  return (
    // START OF PROFILE CARD RENDER
    <Grid container justifyContent="center" sx={{ border: "solid" }}>
      <Grid item container justifyContent="center">
        <Paper sx={ADStyling.welcomePaperStyle} elevation={24}>
          <Grid
            container
            spacing={2}
            columns={16}
            justifyContent="space-between"
          >
            <Grid item xs={8}>
              <img
                style={{ height: "10rem", width: "15" }}
                //ternary condition to check if a user has uploaded a pic if not then the default pic will be assigned. slack://T04T0UTRERE/magic-login/4888690544902-51073be6b17f1a77b5ca38c5dcfc22da92aedb894a272f65133477c0a82823a8
                src={
                  state.userProfile.profilePic !== null
                    ? state.userProfile.profilePic
                    : defaultProfilePicture
                }
                alt="profile p"
              />
            </Grid>
            <Grid item>
              <Grid
                sx={{ height: "10rem" }}
                container
                direction="column"
                justifyContent="space-evenly"
                alignItems="center"
              >
                <Grid item sx={{ marginRight: "1rem" }}>
                  <Typography variant="h5" color="green">
                    {state.userProfile.agencyName}
                  </Typography>
                </Grid>
                <Grid item sx={{ marginRight: "3rem" }}>
                  <Typography variant="h5">
                    <IconButton color="info">
                      <Call /> {state.userProfile.phoneNumber}
                    </IconButton>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid item>{state.userProfile.bio}</Grid>
            </Grid>
          </Grid>
        </Paper>
        {/* // END OF AENCY PROFILE CARD RENDER */}
      </Grid>
        <Grid item direction="row">
          {state.userProfile.sellerListings.map((listing) => {
            return (
              <Grid key={listing.id} item>
                <Paper elevation={24}>
                  <Card sx={{ maxWidth: 350, height: 350 }}>
                    <CardMedia
                      component="img"
                      alt="listing picture"
                      height="140"
                      image={
                        listing.picture1
                          // ? listing.picture1
                          // : defaultProfilePicture
                      }
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {listing.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {listing.description.substring(0,100)}
                        </Typography>                    
                    </CardContent>
                  </Card>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

    </Grid>
  );
}

export default AgencyDetail;

// {state.userProfile.sellerListings.map((listing) => {
//   return (
