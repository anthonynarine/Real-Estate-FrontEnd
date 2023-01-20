import {React, useState } from "react";

//MUI
import { AppBar, Grid, Typography, Button, useStepContext } from "@mui/material";
//react leaflet (note Popup and Marker is NOTE part of link from site.)
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import { Icon } from "leaflet"

//Map Icons
import houseIconPng from "../assets/mapIcons/house.png"
import apartmentIconPng from "../assets/mapIcons/apartment.png"
import officeIconPng from "../assets/mapIcons/office.png"

//assets
import interior1 from "../assets/apartmentInterior/image1.png"
import { useActionData } from "react-router-dom";
import { handleBreakpoints } from "@mui/system";


function Listings() {

  const houseIcon = new Icon({
    iconUrl: houseIconPng,
    iconSize: [40,40],
  });
  const apartmentIcon = new Icon({
    iconUrl: apartmentIconPng,
    iconSize: [40,40],
  });
  const officeIcon = new Icon({
    iconUrl: officeIconPng,
    iconSize: [40,40],
  });

  //state used to manage dynamically adding listing on map (see el below)
  const [latitude, setLatitude] = useState(40.6664183397467)
  const [longitude, setLongitude] = useState(-73.9893293763079)

  const handleClickgoEast = () => {
    setLongitude();
    setLongitude();
  };



  
  return (
    <Grid container>
      <Grid item xs={4}>
        <Button onClick={handleClickgoEast}>Go East</Button>

      </Grid>
      <Grid item xs={8}>
        <AppBar position="sticky">
          <div style={{ height: "100vh" }}>
            {/* Start - code from react-leaflet docs. */}
            <MapContainer
              center={[40.65311, -73.944022]}
              zoom={12}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker icon={houseIcon}  position={[latitude, longitude]}>
                <Popup>
                  <Typography varient="h5">A title</Typography>
                  <img style={{ height: "10rem", width: "14rem"}} src={interior1} alt="listing interior" />
                  <Typography varient="body1">DJ poconos house</Typography>
                  <Button variant="contained" fullWidth>Agency page </Button>
                </Popup>
              </Marker>
            </MapContainer>
            {/* END code from react-leaflet docs */}
          </div>
        </AppBar>
      </Grid>
    </Grid>
  );
}

export default Listings;
