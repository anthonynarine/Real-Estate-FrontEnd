//this components will be called in the the listingDetail page in
//the dialog MUI element tag.

import { useImmerReducer } from "use-immer";
import { useNavigate } from "react-router-dom";
import { React, useEffect, useRef, useMemo, useContext } from "react";
import axios from "axios";

import {
  Grid,
  Paper,
  Button,
  Checkbox,
  TextField,
  FormGroup,
  Typography,
  FormControlLabel,
} from "@mui/material";

//Contexts

import StateContext from "../contex/StateContex";

import { BrightnessLow } from "@mui/icons-material";

// ALL IMPORTS GO ABOVE THIS LINE \\

const listingTypeOptions = [
  {
    value: "",
    label: "",
  },
  {
    value: "Apartment",
    label: "Apartment",
  },
  {
    value: "House",
    label: "House",
  },
  {
    value: "Office",
    label: "Office",
  },
  {
    value: "Commercial Space",
    label: "Commercial Space",
  },
  {
    value: "Parking Space",
    label: "Parking Space",
  },
];
const rentalFrequenceOption = [
  {
    value: "",
    label: "",
  },
  {
    value: "Month",
    label: "Month",
  },
  {
    value: "Week",
    label: "Week",
  },
  {
    value: "Day",
    label: "Day",
  },
  {
    value: "Hour",
    label: "Hour",
  },
];
const propertyStatusOption = [
  {
    value: "",
    label: "",
  },
  {
    value: "Sale",
    label: "Sale",
  },
  {
    value: "Rent",
    label: "Rent",
  },
];

function ListingUpdate({ listingData, closeDialog }) {
  //FORM STYLE START\\
  const styling = {
    mainContainer: {
      positon: "absolute",
      border: "solid black",
      height: "200rem",
    },
    paperStyle: {
      padding: "30px 50px",
      width: "75rem",
      margin: "50px auto",
      borderRadius: 5,
      backgroundColor: "#FDFDFD",
    },
    mapGrid: {
      marginLeft: "30px",
      width: "60rem",
      paddingBottom: "20px",
      martinTop: "25px",
      // border: "solid"
    },
    titleGrid: {
      marginBottom: "8px",
    },
    numAndDescGrid: {
      marginBottom: "20px",
      marginTop: "px",
      // border: 'solid',
      marginLeft: ".25px",
    },
    updateBtn: {
      backgroundColor: " #8A2232 ",
      color: "black",
      width: "25rem",
      fontSize: "13px",
      // margin: "9px",
      marginRight: ".5rem",
      borderRadius: "8px",
      "&:hover": {
        backgroundColor: "#1B7931",
        color: "white",
      },
    },
    areaContentGrid: {
      width: "30rem",
      marginBottom: "25px",
      marginTop: "18px",
    },
  };
  //FORM STYLE END\\

  const navigate = useNavigate();
  const GlobalState = useContext(StateContext);

  //START STATE MANAGEMENT WITH IMMERREDUCER START \\
  const initialState = {
    titleValue: listingData.title,
    listingTypeValue: listingData.listing_type,
    descriptionValue: listingData.description,
    propertyStatusValue: listingData.property_status,
    priceValue: listingData.price,
    rentalFrequencyValue: listingData.rental_frequency,
    roomsValue: listingData.rooms,
    furnishedValue: listingData.furnished,
    poolValue: listingData.pool,
    elevatorValue: listingData.elevator,
    parkingValue: listingData.parking,
    sendRequest: 0,
  };

  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchTitleChange":
        draft.titleValue = action.titleChosen;
        break;
      case "catchListingTypeChange":
        draft.listingTypeValue = action.listingTypeChosen;
        break;
      case "catchPropertyStatusChange":
        draft.propertyStatusValue = action.propertyStatusChosen;
        break;
      case "catchDescriptionChange":
        draft.descriptionValue = action.descriptionChosen;
        break;
      case "catchPriceChange":
        draft.priceValue = action.priceChosen;
        break;
      case "catchRentalFrequencyChange":
        draft.rentalFrequencyValue = action.rentalFrequencyChosen;
        break;
      case "catchRoomsChange":
        draft.roomsValue = action.roomsChosen;
        break;
      case "catchFurnishedChange":
        draft.furnishedValue = action.furnishedChosen;
        break;
      case "catchPoolChange":
        draft.poolValue = action.poolChosen;
        break;
      case "catchElevatorChange":
        draft.elevatorValue = action.elevatorChosen;
        break;
      case "catchParkingChange":
        draft.parkingValue = action.parkingChosen;
        break;
      case "changeSendRequest":
        draft.sendRequest = draft.sendRequest + 1;
        break;
    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  //START STATE MANAGEMENT WITH IMMERREDUCER END \\

  //FORM SUBMIT HANDLE FUNCTIONALITY START\\
  function FormSubmitHandler(event) {
    event.preventDefault();
    console.log("The form has been submitted");
    dispatch({ type: "changeSendRequest" });
    //onSubmit sendRequst changes to the opposite of what it courrently is
  }

  //START OF POST REQUEST TO ADD A LISTING \\
  useEffect(() => {
    if (state.sendRequest) {
      async function updateProperty() {
        const formData = new FormData();
        // this condition will remove the rooms field is a listing is updated to office
        if (state.listingTypeValue === "parking" || state.listingTypeValue === "rooms") {
          formData.append("title", state.titleValue);
          formData.append("description", state.descriptionValue);
          formData.append("listing_type", state.listingTypeValue);
          formData.append("property_status", state.propertyStatusValue);
          formData.append("price", state.priceValue);
          formData.append("rental_frequencey;", state.rentalFrequencyValue);
          // formData.append("rooms;", state.roomsValue);
          formData.append("furnished", state.furnishedValue);
          formData.append("pool", state.poolValue);
          formData.append("elevator", state.elevatorValue);
          // formData.append("parking", state.parkingValue);
          formData.append("seller", GlobalState.userId);
        } else {
          formData.append("title", state.titleValue);
          formData.append("description", state.descriptionValue);
          formData.append("listing_type", state.listingTypeValue);
          formData.append("property_status", state.propertyStatusValue);
          formData.append("price", state.priceValue);
          formData.append("rental_frequencey;", state.rentalFrequencyValue);
          formData.append("rooms", state.roomsValue);
          formData.append("furnished", state.furnishedValue);
          formData.append("pool", state.poolValue);
          formData.append("elevator", state.elevatorValue);
          formData.append("parking", state.parkingValue);
          formData.append("seller", GlobalState.userId);
        }
        try {
          const response = await axios.patch(
            `http://localhost:8000/api/listings/${listingData.id}/update/`,
            //THIS URL MUST BE CREATED IN THE BACK END//
            formData
          );
          console.log(response.data);
          //navigate(0) refreshes page after patch request
          // navigate(0);
          console.log("UPDATED DATA:", response.data);
        } catch (error) {
          console.log(error.response);
        }
      }
      updateProperty();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.sendRequest]);
  //END OF POST REQUEST TO ADD A LISTING \\

  // Function will display price per period seleced called as props in Price Texfield //
  function PriceDisplay() {
    if (
      state.propertyStatusValue === "Rent" &&
      state.rentalFrequencyValue === "Hour"
    ) {
      return "Price per hour*";
    }
    if (
      state.propertyStatusValue === "Rent" &&
      state.rentalFrequencyValue === "Day"
    ) {
      return "Price per Day*";
    } else if (
      state.propertyStatusValue === "Rent" &&
      state.rentalFrequencyValue === "Week"
    ) {
      return "Price per week*";
    } else if (
      state.propertyStatusValue === "Rent" &&
      state.rentalFrequencyValue === "Month"
    ) {
      return "Price per Month*";
    } else {
      return "Price*";
    }
  }

  // MAIN FUNC <RETURN>
  return (
    <Grid
      sx={styling.mainContainermainContainer}
      item
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      <Paper sx={styling.paperStyle} elevation={20}>
        <form onSubmit={FormSubmitHandler}>
          <Grid
            item
            sx={styling.mainContainermainContainer}
            container
            justifyContent="center"
          >
            Update Listing
          </Grid>
          <Grid
            sx={styling.titleGrid}
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={8}>
              <TextField
                margin="normal"
                id="title"
                label="Title*"
                variant="standard"
                fullWidth
                color="success"
                placeholder="Title"
                value={state.titleValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchTitleChange",
                    titleChosen: e.target.value,
                  })
                }
              />
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <TextField
                margin="normal"
                id="propertyStatus"
                label="Property Status*"
                variant="outlined"
                fullWidth
                placeholder="Rental or Sale"
                value={state.propertyStatusValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchPropertyStatusChange",
                    propertyStatusChosen: e.target.value,
                  })
                }
                select
                SelectProps={{ native: true }}
              >
                {propertyStatusOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                margin="normal"
                id="listingType"
                label="Listing Type*"
                variant="outlined"
                fullWidth
                select
                SelectProps={{ native: true }}
                value={state.listingTypeValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchListingTypeChange",
                    listingTypeChosen: e.target.value,
                  })
                }
              >
                {listingTypeOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                type="number"
                margin="normal"
                id="price"
                //SETTING PRICE TO A FUNCTION
                label={PriceDisplay()}
                variant="outlined"
                fullWidth
                placeholder="Amount"
                value={state.priceValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchPriceChange",
                    priceChosen: e.target.value,
                  })
                }
              />
            </Grid>
            {/* RENTAL FREQUENCY              */}
            <Grid item xs={6}>
              <TextField
                //disables the rental frequence field if sale is selected
                //disabled prop applied to textfiled greys the field out
                disabled={state.propertyStatusValue === "Sale" ? true : false}
                margin="normal"
                id="rentalFrequency"
                label="Rental Frequency"
                variant="outlined"
                fullWidth
                value={state.rentalFrequencyValue}
                onChange={(e) =>
                  dispatch({
                    type: "catchRentalFrequencyChange",
                    rentalFrequencyChosen: e.target.value,
                  })
                }
                select
                SelectProps={{ native: true }}
              >
                {rentalFrequenceOption.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid
              sx={styling.numAndDescGrid}
              container
              justifyContent="space-evenly"
              spacing={4}
              direction="row-reverse"
              alignItems="center"
            >
              {/* This ternery condition will check if the listing type is Office and if that's the case
  it the # of rooms filed willnot be renderd.           */}
              {state.listingTypeValue === "Office" ? (
                ""
              ) : (
                <Grid item xs={2}>
                  <TextField
                    type="number"
                    color="success"
                    margin="normal"
                    id="rooms"
                    label="Number of Rooms"
                    variant="outlined"
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="Number of Rooms"
                    value={state.roomsValue}
                    onChange={(e) =>
                      dispatch({
                        type: "catchRoomsChange",
                        roomsChosen: e.target.value,
                      })
                    }
                  />
                </Grid>
              )}
              <Grid
                item
                xs={8}
                justifyContent="center"
                sx={{ marginLeft: "1rem", marginRight: "1rem" }}
              >
                <TextField
                  margin="normal"
                  id="description"
                  label="Description"
                  variant="outlined"
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Description"
                  value={state.descriptionValue}
                  onChange={(e) =>
                    dispatch({
                      type: "catchDescriptionChange",
                      descriptionChosen: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          {/* DESCRIPTION              */}
          {/* CHECK BOX FUNCTIONALITY START             */}
          <Grid
            container
            direction="row"
            justifyContent="space-evenly"
            alignItems="center"
          >
            <Grid item>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.furnishedValue}
                      onChange={(e) =>
                        dispatch({
                          type: "catchFurnishedChange",
                          furnishedChosen: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Furnished"
                />
              </FormGroup>
            </Grid>
            <Grid item>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.poolValue}
                      onChange={(e) =>
                        dispatch({
                          type: "catchPoolChange",
                          poolChosen: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Pool"
                />
              </FormGroup>
            </Grid>
            <Grid item>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.elevatorValue}
                      onChange={(e) =>
                        dispatch({
                          type: "catchElevatorChange",
                          elevatorChosen: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Elevator"
                />
              </FormGroup>
            </Grid>
            <Grid item>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={state.parkingValue}
                      onChange={(e) =>
                        dispatch({
                          type: "catchParkingChange",
                          parkingChosen: e.target.checked,
                        })
                      }
                    />
                  }
                  label="Parking"
                />
              </FormGroup>
            </Grid>
          </Grid>
          {/* CHECK BOX FUNCTIONALITY end     */}
          <Grid
            item
            container
            justifyContent="center"
            alignContent="center"
            sx={{ marginTop: "4rem" }}
          >
            <Grid item xs={4} alignItems="center" justifyContent="space-evenly">
              <Button
                fullWidth
                sx={styling.updateBtn}
                type="submit"
                margin="normal"
                variant="contained"
                color="primary"
                onClick={closeDialog}
              >
                <Typography variant="subtitle1">Update</Typography>
              </Button>
              <Grid item xs={4} sx={{ marginTop: "16px" }}>
                <Button
                  fullWidth
                  sx={styling.updateBtn}
                  type="submit"
                  margin="normal"
                  variant="contained"
                  color="primary"
                  onClick={closeDialog}
                >
                  <Typography variant="subtitle1">Close</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
}

export default ListingUpdate;
