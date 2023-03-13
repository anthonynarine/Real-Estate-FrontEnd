//this page will display all the listings of a user.
// see app.js for path and route syntax and how the users id is used.
// useParms hook will be used along withe the async function to acces
// the user id

/* eslint-disable react-hooks/exhaustive-deps */
import {Grid,Paper,TextField,Typography,Button,CircularProgress,IconButton,Card,CardMedia,CardActions,CardContent,} from "@mui/material";
import defaultProfilePicture from "../assets/defaultProfilePicture.jpg";
import { useNavigate, useParams } from "react-router-dom";
import { BorderBottom, Call, Room } from "@mui/icons-material";
import { React, useEffect, useContext } from "react";
import StateContex from "../contex/StateContex";
import { useImmerReducer } from "use-immer";
import axios from "axios";

//FORM STYLE START\\
const ADStyling = {
  profilePaper: {
    padding: "20px 20px",
    width: "33rem",
    marginTop: "50px",
    marginBottom: "20px",
    borderRadius: 2,
    // backgroundColor: "#f9f9f9",
    border: "solid #367588",
  },
  listingPaper: {
    // border: "solid #367588",
    borderRadius:"20%"
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
        console.log(
          "TEST userProfile.sellerlistings DATA:",
          state.userProfile.sellerListings
        );
        console.log(response.data);
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
    <Grid container justifyContent="center">
      <Grid
        item
        container
        justifyContent="center"
        sx={{ marginBottom: "3rem" }}
      >
        <Paper sx={ADStyling.profilePaper} elevation={15}>
          <Grid
            container
            spacing={2}
            columns={16}
            justifyContent="space-between"
          >
            <Grid item xs={8}>
              <img
                style={{ height: "10rem", width: "15" }}
//ternary condition to check if a user has uploaded a pic if not then the default pic will be assigned.
                src={
                  state.userProfile.sellerListings !== null
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
{/* // END OF PROFILE CARD RENDER */}

{/* START OF LISTINGS RENDER */}
      </Grid>
      <Grid
        sx={{ marginBottom: "rem" }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        justifyContent="space-evenly"
      >
        {state.userProfile.sellerListings.map((listing) => {
          return (
            <Grid item key={listing.id}>
              <Paper sx={ADStyling.listingPaper} elevation={24}>
                <Card sx={{ maxWidth: 350, height: 350 }}>
                  <CardMedia
                    component="img"
                    alt="listing picture"
                    height="140"
// HAD TO ADD `http://localhost:800 prefix this is just how Django works with nested serializer fields.
// It since the listing model is nested on the profile model the profile model will have the full path
//while the nested picture(1-5) are nested and therefore will not have the full path. (see post or payload)
                    image={
                      `http://localhost:8000${listing.picture1}`
                        ? `http://localhost:8000${listing.picture1}`
                        : defaultProfilePicture
                    }
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {listing.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {listing.description.substring(0, 150)}...
                      {console.log(listing.propery_status)}
                    </Typography>
                  </CardContent>
{/* ternary operator to handle if listing.property_status === sale we the price just the price  */}
{/* if that's not the case we want the price and (it will be for rent if not sale) and rental rental_frequency */}
                  <CardActions>
                    {listing.property_status === "Sale"
                      ? `${listing.listing_type}: $${listing.price}`
                      : `${listing.listing_type}: $${listing.price
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/${
                          listing.rental_frequency
                        }`}
                  </CardActions>
                </Card>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
{/* END OF LISTINGS RENDER */}
    </Grid>
  );
}

export default AgencyDetail;

// {state.userProfile.sellerListings.map((listing) => {
//   return (
