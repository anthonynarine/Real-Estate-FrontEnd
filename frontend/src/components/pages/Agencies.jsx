// This component will diplay each user  \\

import {
  Grid,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Card,
  CardActions,
  CardMedia,
  CardContent,
} from "@mui/material";
import defaultProfilePicture from "../assets/defaultProfilePicture.jpg";
import { React, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import axios from "axios";

//Agencies page STYLE START\\
const agencyStyling = {
  mainContainer: {
    marginTop: "2rem",
  },
};

function Agencies() {
  //START STATE MANAGEMENT WITH IMMERREDUCER START \\
  const initialState = {
    // As always with get request you will need state for datais loading
    dataIsLoading: true,
    //an empty array for the agencies that we want to display
    agenciesList: [],
  };

  function ReducerFunction(draft, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "catchAgencies":
        draft.agenciesList = action.agenciesArray;
        break;
      case "loadingDone":
        draft.dataIsLoading = false;
        break;
    }
  }
  const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
  //START STATE MANAGEMENT WITH IMMERREDUCER END \\

  // REQUEST TO GET ALL PROFILES START//
  // useEffect will run once when page loads
  useEffect(() => {
    async function GetAgencies() {
      try {
        const response = await axios.get(`http://localhost:8000/api/profiles/`);
        console.log("AgenciesList:", response.data);
        dispatch({
          type: "catchAgencies",
          agenciesArray: response.data,
          //value being caught
        });
        // dispatch used switching dataIsLoading on and off
        dispatch({ type: "loadingDone" });
      } catch (error) {
        console.log(error.response);
      }
    }
    GetAgencies();
  }, []);
  // REQUEST TO GET ALL PROFILES END//

  //functionality to keep user data in form @ profile page
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
// to better see this loding animation comment out setDataIsLoading above
  }

  return (
    <Grid
      container
      sx={agencyStyling.mainContainer}
      rowSpacing={2}
      justifyContent="center"
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      {state.agenciesList.map((agency) => {

        function PropertiesDisplay() {
          if (agency.seller_listings.length === 0) {
            return <Button disabled size="small">No Listing</Button>;
          } else if (agency.seller_listings.length === 1) {
            return <Button size="small">1 Property listed</Button>;
          } else {
            <Button size="small">
              {agency.seller_listings.length} Properties
            </Button>;
          }
        }

        if (agency.agency_name && agency.phone_number)
          return (
            <Grid key={agency.id} item>
              <Paper elevation={24}>
                <Card sx={{ maxWidth: 345, height: 350 }}>
                  <CardMedia
                    component="img"
                    alt="profile picture"
                    height="140"
// if agency.profile_picture exist we want to return it if that's not the case we return defaultProfilePicture
                    image={
                      agency.profile_picture
                        ? agency.profile_picture
                        : defaultProfilePicture
                    }
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {agency.agency_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
{/* substring(0,100) will allow the 1st 100 charachers in the bio to be displayed */}
                      {agency.bio.substring(0, 100)}...
                    </Typography>
                  </CardContent>
{/* This function will render a different note based on the amount of properties a user has listed (see function above) */}
                  <CardActions>{PropertiesDisplay()}</CardActions>
                </Card>
              </Paper>
            </Grid>
          );
      })}
    </Grid>
  );
}

export default Agencies;
