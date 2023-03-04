import { Grid, Paper, TextField, Typography, Button, CircularProgress,} from "@mui/material";
import { React, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import StateContex from "../contex/StateContex";
import ProfileUpdate from "./ProfileUpdate";
import { useImmerReducer } from "use-immer";
import axios from "axios";
import { Container } from "@mui/system";
import { DraftsRounded } from "@mui/icons-material";




//FORM STYLE START\\
const agencyStyling = {
  welcomePaperStyle: {
    padding: "20px 20px",
    width: "40rem",
    marginTop: "30px",
    marginBottom: "20px",
    borderRadius: 2,
    // backgroundColor: "#f9f9f9",
    border: "solid #79B2BE",
  },
  paperContainer: {
    padding: "40px 40px",
    height: "70rem",
    marginTop: "30px",
    marginBottom: "30px",
    backgroundColor: "#ffffff",
    border: "solid #79B2BE",

  },
  paperStyle: {
    padding: "20px 20px",
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

function Agencies(){
  
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
        draft.agenciesList = action.agencyArray;
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
        const response = await axios.get(
          `http://localhost:8000/api/profiles/`
        );
        console.log("AgenciesList:", response.data,);
        dispatch({
          type: "catchAgencies",
          agenciesArray: response.data,
          //value being caught
        });
// dispatch used switching dataIsLoading on and off
        dispatch( { type: "loadingDone" })
      } catch (error) {
        console.log(error.response);
      }
    }
    GetAgencies();
  }, []);
// REQUEST TO GET ALL PROFILES end//


  //functionality to keep user data in form @ profile page
  if (state.dataIsLoading === true) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{height: "85vh"}}>
        <CircularProgress />
      </Grid>
    );
    // to better see this loding animation comment out setDataIsLoading above
  }

//MAIN FUNC RETURN
  return <div>test</div>

}

export default Agencies
