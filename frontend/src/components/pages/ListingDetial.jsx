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
  Breadcrumbs,
  Link,
} from "@mui/material";
import defaultProfilePicture from "../assets/defaultProfilePicture.jpg";
import {
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
  KeyboardArrowLeft,
  KeyboardArrowRigh,
  KeyboardArrowRight,
  UploadOutlined,
} from "@mui/icons-material";
import { React, useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Call, Room } from "@mui/icons-material";
import StateContex from "../contex/StateContex";
import { useImmerReducer } from "use-immer";
import axios from "axios";

//FORM STYLE START\\
const LDStyling = {
  mainPaper: {
    padding: "5px 5px",
    paddingTop: "5px",
    marginTop: "2rem",
    marginBottom: "5rem",

    borderRadius: 2,
    // backgroundColor: "#f9f9f9",
    // border: "solid #9B89A4",
  },
  mainContainer: {
    marginTop: "1rem",
    marginLeft: "1.7rem",
    marginRight: "1rem",
    marginBottom: "1rem",
    // border: "solid #79B2BE  ",
  },
  sliderContainer: {
    position: "relative",
    marginTop: "1rem",
  },
  leftArrow: {
    position: "absolute",
    cursor: "pointer",
    fontSize: "3rem",
    color: "#F2F0EB",
    top: "50%",
    left: "20%",
    "&:hover": {
      backgroundColor: "#81BE83",
      borderRadius: "2rem",
    },
  },
  rightArrow: {
    position: "absolute",
    cursor: "pointer",
    fontSize: "3rem",
    color: "#F2F0EB",
    top: "50%",
    right: "20%",
    "&:hover": {
      backgroundColor: "#81BE83",
      borderRadius: "2rem",
    },
  },
};

function ListingDetail() {
  const navigate = useNavigate();
  const GlobalState = useContext(StateContex);

  const params = useParams();

  console.log("useParams TEST", useParams());

  //START STATE MANAGEMENT WITH IMMERREDUCER START \\
  const initialState = {
    listingInfo: "",
    //dataIsLoading state will initially be true, then will become false when we get the data
    dataIsLoading: true,
    // datais loading is nice to use with all get requests.
  };

  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchListingInfo":
        draft.listingInfo = action.listingObject;
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
    async function GetListingInfo() {
      try {
        // backticks w/ string inperpolation to grab the user's id from GlobalState
        const response = await axios.get(
          `http://localhost:8000/api/listings/${params.id}/`
        );
        console.log("TEST ListingInfo DATA:", state.listingInfo);
        console.log(response.data);
        dispatch({
          type: "catchListingInfo",
          listingObject: response.data,
          //value being caught
        });
        // dispatch used switching dataIsLoading on and off
        dispatch({ type: "loadingDone" });
      } catch (error) {
        console.log(error.response);
      }
    }
    GetListingInfo();
  }, []);

  //array to hold listing images
  const listingPictures = [
    state.listingInfo.picture1,
    state.listingInfo.picture2,
    state.listingInfo.picture3,
    state.listingInfo.picture4,
    state.listingInfo.picture5,
  ].filter((picture) => picture !== null);
  // to account for less than 5 image UploadOutlined we filter the array to return pictures that have a value

  const [currentPicture, setCurrentPicture] = useState(0);

  // onClick functionality for next and previous picture
  //if the current picture is from index 4 then return to index 0 if thats the case
  //if not then go to the next index
  function NextPicture() {
    if (currentPicture === listingPictures.length - 1) {
      return setCurrentPicture(0);
    } else {
      return setCurrentPicture(currentPicture + 1);
    }
  }
  function PreviousPicture() {
    if (currentPicture === 0) {
      return setCurrentPicture(listingPictures.length - 1);
    } else {
      return setCurrentPicture(currentPicture - 1);
    }
  }
  
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
  };

// This code is to display the date without the suffix from the date as sent from the be (2023-03-05)
  const date =new Date(state.listingInfo.date_posted)
  const formttedDate = `Posted: ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`


  return (
    <Paper sx={LDStyling.mainPaper} >
    <Grid container sx={LDStyling.mainContainer}>

        <Grid item>
          {/* see notes on MUI BreadCrumb component below         */}
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              sx={{ cursor: "pointer",  }}
              underline="hover"
              color="inherit"
              onClick={() => navigate("/listings")}
            >
              <Typography variant="subtitle1" sx={{fontWeight: "bold", color: "#00BCBC"}} >Listings</Typography>
            </Link>
            <Typography color="text.primary">
              {state.listingInfo.title}
            </Typography>
          </Breadcrumbs>
        </Grid>
        {/* // image slider render */}
        {/* Ternary operator to render image slider only if there are uploaded images.       */}
        {listingPictures.length > 0 ? (
          <Grid
            container
            direction="row-reverse"
            justifyContent="center"
            sx={{ marginRight: "1rem" }}
            alignItems="stretch"
          >
            <Grid item container sx={LDStyling.sliderContainer} xs={8}>
              <Grid item container justifyContent="center">
                {listingPictures.map((picture, index) => {
                  return (
                    // Render this on a card on refactor
                    <Grid item key={index}>
                      {index === currentPicture ? (
                        <img
                          src={picture}
                          alt="listing img"
                          style={{
                            width: "45rem",
                            height: "35rem",
                            // borderRadius: "2rem",
                            paddingBottom: "none",
                          }}
                        />
                      ) : (
                        ""
                      )}
                    </Grid>
                  );
                })}
              </Grid>
              <ArrowCircleLeftOutlined
                onClick={PreviousPicture}
                sx={LDStyling.leftArrow}
              />
              <ArrowCircleRightOutlined
                onClick={NextPicture}
                sx={LDStyling.rightArrow}
              />
              {/* Testing index changes for next and previous functionality */}
              {/* {currentPicture} */}
            </Grid>
          </Grid>
        ) : (
          ""
        )}
        <Grid item container>
          <Grid
            item
            container
            xs={7}
            direction="column"
          >
            <Grid item sx={{ marginTop: "1.5rem" }}>
              <Typography variant="h5">{state.listingInfo.title}</Typography>
            </Grid>
            <Grid item>
              <Room  sx={{color:"#00BCBC"}}/>{" "}
              <Typography variant="h6">
                {state.listingInfo.area}, {state.listingInfo.state}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                {formttedDate}
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={5}
              justifyContent="center"
              sx={{ marginLeft: "4rem" }}
            >
{/* Ternary operator to render a listing for sale or a listing for
 rent based on the Sale filed. */}
              <Typography variant="h6" sx={{fontWeight: "bold", color: "#00A86B", marginLeft: "2.5rem"}} >
                {state.listingInfo.listing_type} |{" "}
                {state.listingInfo.property_status === "Sale"
                  ? `$${state.listingInfo.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
                  : `${state.listingInfo.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}/${
                      state.listingInfo.rental_frequency
                    }`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      {/* </Paper> */}
    </Grid>
    </Paper>
  );
}

export default ListingDetail;

//Breadcrumbs is a quick mui compoenent to stup a link
// Breadcrumbs consist of a list of links
// that help a user visualize a page's location
// within the hierarchical structure of a website,
// and allow navigation up to any of its "ancestors".
