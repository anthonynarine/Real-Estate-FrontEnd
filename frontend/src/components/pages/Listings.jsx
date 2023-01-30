import { React, useState, useEffect } from "react";
import axios from "axios";

//shapes
// import polyOne from "../shapes/polyLine";
// import polygonOne from "../shapes/polygon";

//MUI
import {AppBar,Grid,Typography,Button,Card,CardHeader,CardMedia,CardContent,CircularProgress,} from "@mui/material";
//react leaflet (note Popup and Marker is NOTE part of link from site.)
import {MapContainer,TileLayer,Popup,Marker,Polyline,Polygon,} from "react-leaflet";
import { Icon } from "leaflet";

//Map Icons
import houseIconPng from "../assets/mapIcons/house.png";
import apartmentIconPng from "../assets/mapIcons/apartment.png";
import officeIconPng from "../assets/mapIcons/office.png";
import parkingIconPng from "../assets/mapIcons/parking.png";

// SYTLING FUNCTIONALITY START
const cardSytles = {
  card: {
    margin: "0.5rem",
    border: "1px  solid cream",
    position: "relative",
    background: "#AAD3DF",
    color: "#070102",
  },
  imageStyles: {
    paddingRight: "1rem",
    paddingLeft: "1rem",
    height: "20rem",
    width: "30rem",
  },
  price: {
    position: "absolute",
    backgroundColor: "green",
    zIndex: "1000",
    color: "white",
    top: "100px",
    left: "20px",
    padding: "5px",
  },
  container: {
    backgroundColor: "#9D88A4",
  },
};
// SYTLING FUNCTIONALITY END

//MAP ICONS START
function Listings() {
  const houseIcon = new Icon({
    iconUrl: houseIconPng,
    iconSize: [40, 40],
  });
  const apartmentIcon = new Icon({
    iconUrl: apartmentIconPng,
    iconSize: [40, 40],
  });
  const officeIcon = new Icon({
    iconUrl: officeIconPng,
    iconSize: [40, 40],
  });
  const parkingIcon = new Icon({
    iconUrl: parkingIconPng,
    iconSize: [40, 40],
  });
  //MAP ICONS END

  //DATA FETCHING FROM BACK END WITH CLEAN UP FUNCTIONALITY AND TOKEN GENERATION START.
  const [allListings, setAllListings] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);

  useEffect(() => {
    //this will generate a token that can be attached to this request. 
    const source = axios.CancelToken.source();
    const getAllListings = async () => {
      try {
        let response = await axios.get("http://localhost:8000/api/listings/", {cancelToken: source.token});
        // console.log("DATA ARRAY:", response.data)
        setAllListings(response.data);
        setDataIsLoading(false)
      } catch (error) {
        console.log(error.response);
      }
    };
    getAllListings();
    //CLEAN UP FUNCTION WITH TOKEN CANCEL START
    return() => {
      source.cancel();
    };
    //CLEAN UP FUNCTION WITH TOKEN CANCEL END
  }, []);

  if (dataIsLoading === false) {
    console.log("DATA:", allListings[0].location);
  }

  if (dataIsLoading === true) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{height: "85vh"}}>
        <CircularProgress />
      </Grid>
    );
    // to better see this loding animation comment out setDataIsLoading above
  }
  //DATA FETCHING FROM BACK END WITH CLEAN UP FUNCTIONALITY AND TOKEN GENERATION END.

  
  return (
    <Grid container sx={cardSytles.container}>
      <Grid item xs={4}>
        {/* START OF LISTING CARD DISPLAY */}
        {allListings.map((listing) => {
          return (
            <Card key={listing.id} sx={cardSytles.card}>
              <CardHeader
                // action={
                //   <IconButton aria-label="settings">
                //     <MoreVertIcon />
                //   </IconButton>
                // }
                // DISPLAY CARD TITLE
                title={listing.title}
              />
              <CardMedia
                // DISPLAY CARD IMAGE
                component="img"
                image={listing.picture1}
                alt={listing.title}
              />
              <CardContent>
                {/* Display Card Body */}
                <Typography variant="body2">
                  {listing.description.substring(0, 200)}...
                </Typography>
                {/* START CODE BLOCK FOR COMMOA IN  PRICE AND RENTAL VS SALE LOGIC */}
              </CardContent>
              {listing.property_status === "Sale" ? (
                <Typography sx={cardSytles.price}>
                  {listing.listing_type}: $
                  {listing.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Typography>
              ) : (
                <Typography sx={cardSytles.price}>
                  {listing.listing_type}: $
                  {listing.price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                  / {listing.rental_frequency}
                </Typography>
              )}
              {/* END CODE BLOCK FOR COMMOA IN  PRICE AND RENTAL VS SALE LOGIC */}

              {/* <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions> */}
            </Card>
          );
        })}
      </Grid>
      {/* END OF LISTING CARD DISPLAY  */}
      <Grid item xs={8} sx={{ marginTop: "0.5rem" }}>
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
              {/* NOTES ON POLYLINE BELOW */}
              {/* <Polyline positions={polyOne} weight={10} />
              <Polygon
                positions={polygonOne}
                color="green"
                fillColor="green"
                fillOpacity={0.9}
                opacity={0}
              /> */}
              {/* MAP ICON AND POPUP RENDER START */}
              {allListings.map((listing) => {
                function IconDisplay() {
                  if (listing.listing_type === "House") {
                    return houseIcon;
                  } else if (listing.listing_type === "Appartment") {
                    return apartmentIcon;
                  } else if (listing.listing_type === "Parking Space") {
                    return parkingIcon;
                  }
                }
                return (
                  <Marker
                    key={listing.id}
                    icon={IconDisplay()}
                    position={[
                      listing.location.coordinates[0],
                      listing.location.coordinates[1],
                    ]}
                  >
                    <Popup>
                      <Typography varient="h5">{listing.title}</Typography>
                      <img
                        style={{ height: "10rem", width: "14rem" }}
                        src={listing.picture1}
                        alt="listing interior"
                      />
                      <Typography varient="body1">
                        {listing.description.substring(0, 150)}...
                      </Typography>
                      <Button variant="contained" fullWidth>
                        Details{" "}
                      </Button>
                    </Popup>
                  </Marker>
                );
              })}
              {/* MAP ICON AND POPUP RENDER END */}
            </MapContainer>
            {/* END code from react-leaflet docs */}
          </div>
        </AppBar>
      </Grid>
    </Grid>
  );
}

export default Listings;

// .toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
// This code to tell react to add a , to ever 1000th - see above Typrography element.


//                                  Clan up function        
// line 16, 29-40 the clean up funtionality will only render data after is has finished loading to avoid errors.  
// CLEAN UP FUNCTION WILL RUN WHEN THE COMPONENT IS UNMOUNTED CANCELING THE TOKEN WHICH WILL CANCEL THE AXIOS REQUEST. (SEE LECTURE 52)
// The token is requested on the get request as show above and cancled as shown in the return statement after the function call 
// The token is stored in the variable source (see below use effect call)
