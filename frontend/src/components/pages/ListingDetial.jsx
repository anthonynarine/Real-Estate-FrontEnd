import {
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Breadcrumbs,
  Link,
  Dialog,
} from "@mui/material";

import {
  ArrowCircleLeftOutlined,
  ArrowCircleRightOutlined,
  CheckBox,
} from "@mui/icons-material";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { React, useEffect, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Room } from "@mui/icons-material";
import StateContex from "../contex/StateContex";
import { useImmerReducer } from "use-immer";
import axios from "axios";

// react icons
import stadiumIconPng from "../assets/mapIcons/stadium.png";
import trainIconPng from "../assets/mapIcons/train.png";
import hospitalIconPng from "../assets/mapIcons/hospital.png";
import { Icon } from "leaflet";

//FORM STYLE START\\
const LDStyling = {
  mainPaper: {
    padding: "5px 5px",
    paddingTop: "5px",
    marginTop: "2rem",
    marginBottom: "25rem",
    width: "90%",
    borderRadius: 2,
    backgroundColor: "#f9f9f9",
    border: "solid #9B89A4",
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
  profileCard: {
    padding: "40px 25px",
    width: "40rem",
    height: "12rem",
    marginTop: "50px",
    marginBottom: "50px",
    borderRadius: 2,
    backgroundColor: "#E5F1ED",
    border: "solid #708090",
  },
  mapGrid: {
    marginLeft: "30px",
    width: "60rem",
    paddingBottom: "20px",
    martinTop: "25px",
    // border: "solid"
  },
  mapPaper: {
    border: "solid #AAD3DF",
    width: "100%",

    marginRight: "10%",
    marginBottom: "10%",
    padding: "9px",
    paddingTop: "33px",
    // paddingTop: "1rem",
    backgroundColor: "#AAD3DF",
  },
  updateBtn: {
    backgroundColor: "#FCC200",
    color: "black",
    width: "6rem",
    fontSize: "13px",
    // margin: "9px",
    marginTop: "1rem",
    marginRight: ".5rem",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#FF7722",
      color: "white",
    },
  },
  deleteBtn: {
    backgroundColor: "#8A2232",
    color: "white",
    width: "6rem",
    fontSize: "13px",
    marginTop: "1rem",
    borderRadius: "8px",
    "&:hover": {
      backgroundColor: "#FCC200",
      color: "black",
    },
  },
};

function ListingDetail() {
  const navigate = useNavigate();

  const GlobalState = useContext(StateContex);

  const params = useParams();

  const stadiumIcon = new Icon({
    iconUrl: stadiumIconPng,
    iconSize: [30, 30],
  });
  const hospitalIcon = new Icon({
    iconUrl: hospitalIconPng,
    iconSize: [30, 30],
  });
  const trainIcon = new Icon({
    iconUrl: trainIconPng,
    iconSize: [30, 30],
  });

  console.log("useParams TEST", useParams());

  //START STATE MANAGEMENT WITH IMMERREDUCER START \\
  const initialState = {
    listingInfo: "",
    //dataIsLoading state will initially be true, then will become false when we get the data
    dataIsLoading: true,
    // datais loading is nice to use with all get requests.
    sellerProfileInfo: "",
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
      case "catchSellerProfileInfo":
        draft.sellerProfileInfo = action.profileObject;
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
        console.log("LISTINGINFO DATA:", state.listingInfo);
        console.log(response.data);
        dispatch({
          type: "catchListingInfo",
          listingObject: response.data,
          //value being caught
        });
        // dispatch used switching dataIsLoading on and off
      } catch (error) {
        console.log(error.response);
      }
    }
    GetListingInfo();
  }, []);

  // REQUEST TO GET listing INFO//
  //This will only execute if the listingInfo exist (listingInfo come from teh above request.)
  useEffect(() => {
    if (state.listingInfo) {
      async function GetProfileInfo() {
        try {
          // backticks w/ string inperpolation to grab the user's id from GlobalState
          const response = await axios.get(
            `http://localhost:8000/api/profiles/${state.listingInfo.seller}/`
          );
          console.log("SELLERProfileInfo:", state.sellerProfileInfo);
          console.log(response.data);
          dispatch({
            type: "catchSellerProfileInfo",
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
    }
  }, [state.listingInfo]);

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


  // This code is to display the date without the suffix from the date as sent from the be (2023-03-05)
  const date = new Date(state.listingInfo.date_posted);
  const formttedDate = `Posted: ${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`;


  //form update state and handlers //
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Async/ Await delete request using axios start\\
  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (confirmDelete) {
      try {
        const response = await axios.delete(
          `http://localhost:8000/api/listings/${params.id}/delete/`
        );
        console.log(response.data);
        navigate("/listings");
      } catch (error) {
        console.log(error.response.data);
      }
    }
  }
  // Async/ Await delete request using axios end\\

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



  // Main return
  return (
    <Grid container justifyContent="center">
      <Paper sx={LDStyling.mainPaper} elevation={24}>
        <Grid container sx={LDStyling.mainContainer}>
          <Grid item>
            {/* see notes on MUI BreadCrumb component below         */}
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                sx={{ cursor: "pointer" }}
                underline="hover"
                color="inherit"
                onClick={() => navigate("/listings")}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", color: "#00BCBC" }}
                >
                  Listings
                </Typography>
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
                              width: "50rem",
                              height: "35rem",
                              border: "solid #B1B6B7 ",
                              borderRadius: "2%",
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
          <Paper
            sx={{
              width: "100%",
              marginRight: "5%",
              marginBottom: "2rem",
              marginTop: "rem",
              paddingBottom: ".5rem",
              paddingLeft: "1.5rem",
              backgroundColor: "#AAD3DF",
              border: "solid #9B89A4",
            }}
            justifyContent="space-evenly"
          >
            <Grid item container>
              <Grid
                item
                container
                spacing={1}
                xs={7}
                direction="column"
                // sx={{ border: "solid"}}
              >
                <Grid item sx={{ marginTop: "1.5rem" }}>
                  <Typography variant="h5">
                    {state.listingInfo.title}
                  </Typography>
                </Grid>
                <Grid item>
                  <Room sx={{ color: "#00BCBC" }} />{" "}
                  <Typography variant="h6">
                    {state.listingInfo.area}, {state.listingInfo.state}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">{formttedDate}</Typography>
                </Grid>
              </Grid>
              {/* Ternary operator to render a listing for sale or a listing for rent based on the Sale field. */}
              <Grid
                item
                direction="column"
                justifyContent="space-evenly"
                container
                xs={5}
                // sx={{border: "solid"}}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#00A86B",
                    // marginLeft: "5rem",
                  }}
                >
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
                <Typography
                  onClick={() =>
                    navigate(`/agencies/${state.sellerProfileInfo.seller}`)
                  }
                  variant="h6"
                  sx={{ cursor: "pointer" }}
                >
                  {state.sellerProfileInfo.agency_name}
                </Typography>
                <Typography variant="subtitle1">
                  Contact {state.sellerProfileInfo.phone_number}
                </Typography>
                {GlobalState.userId == state.listingInfo.seller ? (
                  <Grid item container justifyContent="space-" xs={4}>
                    <Button onClick={handleClickOpen} varient="contained" sx={LDStyling.updateBtn}>
                      update
                    </Button>
                    <Button
                      onClick={handleDelete}
                      varient="contained"
                      sx={LDStyling.deleteBtn}
                    >
                      delete
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                      THIS IS THE DIALOG BOX
                    </Dialog>
                  </Grid>
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          </Paper>
          {/* Checkbox fields start */}
          <Paper
            sx={{
              width: "100%",
              marginRight: "5%",
              marginBottom: "2rem",
              paddingBottom: "1rem",
              paddingTop: "1rem",
              backgroundColor: "#AAD3DF",
              border: "solid #9B89A4",
            }}
          >
            <Grid item alignItems="center" container justifyContent="center">
              {state.listingInfo.rooms ? (
                <Grid item xs={2} display="flex">
                  <Typography varient="h6">
                    {state.listingInfo.rooms} Rooms
                  </Typography>
                </Grid>
              ) : (
                ""
              )}
              {state.listingInfo.rooms ? (
                <Grid item xs={2} display="flex">
                  <CheckBox sx={{ color: "#00A86B", fontSize: "1.5rem" }} />{" "}
                  <Typography varient="h6">Furnished</Typography>
                </Grid>
              ) : (
                ""
              )}
              {state.listingInfo.pool ? (
                <Grid item xs={2} display="flex">
                  <CheckBox sx={{ color: "#00A86B", fontSize: "1.5rem" }} />{" "}
                  <Typography varient="h6">Pool</Typography>
                </Grid>
              ) : (
                ""
              )}
              {state.listingInfo.elevator ? (
                <Grid item xs={2} display="flex">
                  <CheckBox sx={{ color: "#00A86B", fontSize: "1.5rem" }} />{" "}
                  <Typography varient="h6">Elevator</Typography>
                </Grid>
              ) : (
                ""
              )}
              {state.listingInfo.parking ? (
                <Grid item xs={2} display="flex">
                  <CheckBox sx={{ color: "#00A86B", fontSize: "1.5rem" }} />{" "}
                  <Typography varient="h6">Parking</Typography>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          </Paper>
          {/* Description field */}
          <Paper
            sx={{
              width: "100%",
              marginRight: "5%",
              paddingBottom: "1rem",
              // paddingTop: "1rem",
              backgroundColor: "#AAD3DF",
              border: "solid #9B89A4",
              marginBotton: "2rem",
            }}
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ marginTop: "2rem" }}
            >
              <Grid xs={6} item justifyContent="center">
                <Typography variant="h6" color="#00A86B">
                  Description
                </Typography>{" "}
              </Grid>
              <Grid
                xs={8}
                sx={{ width: "90%", marginTop: "1rem", marginBottom: "2" }}
                item
              >
                <Typography variant="subtitle1">
                  {state.listingInfo.description}
                </Typography>{" "}
              </Grid>
            </Grid>
          </Paper>
          {/* PROFILE CARD */}
          {/* <Grid container justifyContent="center">
            <Paper sx={LDStyling.profileCard}>
              <Grid
                container
                spacing={2}
                columns={16}
                justifyContent="space-between"
              >
                <Paper
                  elevation={24}
                  sx={{
                    height: "200px",
                    width: "200px",
                    borderRadius: "50%",
                    backgroundColor: "pink",
                    // border: "solid #00A86B",
                    borderWidth: "8px",
                    // borderTopRightRadius: "20%",
                    // borderTopLeftRadius: "20%",
                    borderBottomRightRadius: "20%",
                    borderBottomRightRadius: "5px",
                  }}
                >
                  <Grid item xs={8}>
                    <img
                      onClick={() =>
                        navigate(`/agencies/${state.sellerProfileInfo.seller}`)
                      }
                      style={{
                        cursor: "pointer",
                        height: "200px",
                        width: "200px",
                        borderRadius: "50%",
                        border: "solid #F0E7F2",
                        // borderTopRightRadius: "20%",
                        // borderTopLeftRadius: "20%",
                        borderBottomRightRadius: "20%",
                        borderBottomRightRadius: "5px",
                      }}
                      //ternary condition to check if a user has uploaded a pic if not then the default pic will be assigned.
                      src={
                        state.sellerProfileInfo.seller_listings !== null
                          ? state.sellerProfileInfo.profile_picture
                          : defaultProfilePicture
                      }
                      alt="profile p"
                    />
                  </Grid>
                </Paper>
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
                        {state.sellerProfileInfo.agency_name}
                      </Typography>
                    </Grid>
                    <Grid item sx={{ marginRight: "3rem" }}>
                      <Typography variant="h5">
                        <IconButton color="info">
                          <Call /> {state.sellerProfileInfo.phone_number}
                        </IconButton>
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {/* <Grid item container alignItems="flex-end">
                  <Grid item>{state.sellerProfileInfo.bio}</Grid>
                </Grid> */}
          {/* </Grid>
            </Paper>
          </Grid>  */}
          {/* // END OF PROFILE CARD RENDER */}

          <Grid item container justifyContent="center">
            <Grid item sx={{ marginTop: "2rem" }}>
              {/* Map container start */}
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center "
              >
                <Paper sx={LDStyling.mapPaper} elevation={24}>
                  <Grid sx={LDStyling.mapGrid} item display="flex">
                    <MapContainer
                      center={[
                        // center on marker position on render
                        state.listingInfo.latitude,
                        state.listingInfo.longitude,
                      ]}
                      zoom={14}
                      scrollWheelZoom={true}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker
                        // marker position for listing location
                        position={[
                          state.listingInfo.latitude,
                          state.listingInfo.longitude,
                        ]}
                      >
                        <Popup>{state.listingInfo.title}</Popup>
                      </Marker>
                      {state.listingInfo.listing_poi_within_5miles.map(
                        (poi) => {
                          function PoiIcon() {
                            if (poi.type === "Stadium") {
                              return stadiumIcon;
                            } else if (poi.type === "Hospital") {
                              return hospitalIcon;
                            } else if (poi.type === "Train") {
                              return trainIcon;
                            }
                          }
                          return (
                            <Marker
                              key={poi.id}
                              position={[
                                poi.location.coordinates[0],
                                poi.location.coordinates[1],
                              ]}
                              icon={PoiIcon()}
                            >
                              <Popup>{poi.name}</Popup>
                            </Marker>
                          );
                        }
                      )}
                    </MapContainer>
                  </Grid>
                </Paper>
              </Grid>
              {/* Map container end */}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default ListingDetail;

//Breadcrumbs is a quick mui compoenent to stup a link
// Breadcrumbs consist of a list of links
// that help a user visualize a page's location
// within the hierarchical structure of a website,
// and allow navigation up to any of its "ancestors".
