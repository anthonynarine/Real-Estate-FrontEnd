// /* eslint-disable default-case */
// import axios from "axios";
// import { useImmerReducer } from "use-immer";
// import { useNavigate } from "react-router-dom";
// import { React, useState, useEffect } from "react";

// //shapes
// // import polyOne from "../shapes/polyLine";
// // import polygonOne from "../shapes/polygon";

// //MUI
// import {AppBar,Grid,Typography,Button,Card,CardHeader,CardMedia,CardContent,  CircularProgress,IconButton,CardActions
// } from "@mui/material";
// //react leaflet (note Popup and Marker is NOTE part of link from site.)
// import {MapContainer,TileLayer,Popup, Marker,Polyline, Polygon,useMap,} from "react-leaflet";
// import { Icon } from "leaflet";

// // MUI icons
// import { Room } from "@mui/icons-material";

// //Map Icons
// import apartmentIconPng from "../assets/mapIcons/apartment.png";
// import parkingIconPng from "../assets/mapIcons/parking.png";
// import officeIconPng from "../assets/mapIcons/office.png";
// import houseIconPng from "../assets/mapIcons/house.png";

// // SYTLING FUNCTIONALITY START
// const cardSytles = {
//   card: {
//     margin: "0.5rem",
//     border: "1px  solid cream",
//     position: "relative",
//     background: "#AAD3DF",
//     color: "#070102",
//   },
//   imageStyles: {
//     paddingRight: "1rem",
//     paddingLeft: "1rem",
//     height: "20rem",
//     width: "30rem",
//   },
//   price: {
//     position: "absolute",
//     backgroundColor: "green",
//     zIndex: "1000",
//     color: "white",
//     top: "100px",
//     left: "20px",
//     padding: "5px",
//   },
//   container: {
//     backgroundColor: "#9D88A4",
//   },
// };
// // SYTLING FUNCTIONALITY END

// //MAP ICONS START
// function Listings() {

//   const navigate = useNavigate();

//   const houseIcon = new Icon({
//     iconUrl: houseIconPng,
//     iconSize: [40, 40],
//   });
//   const apartmentIcon = new Icon({
//     iconUrl: apartmentIconPng,
//     iconSize: [40, 40],
//   });
//   const officeIcon = new Icon({
//     iconUrl: officeIconPng,
//     iconSize: [40, 40],
//   });
//   const parkingIcon = new Icon({
//     iconUrl: parkingIconPng,
//     iconSize: [40, 40],
//   });
//   //MAP ICONS END

//   const initialState = {
//     mapInstance: null,
//   };

//   function ReducerFunction(draft, action) {
//     switch (action.type) {
//       case "getMap":
//         draft.mapInstance = action.mapData;
//         break;
//     }
//   };

//   const [state, dispatch] = useImmerReducer(ReducerFunction, initialState);
//  //START STATE MANAGEMENT WITH IMMERREDUCER END \\

// //   HOOK PROVIDING LEAFLET MAP INSTANCE IN ANY DECEDANT OF MAPCONTAINER (SEE LEAFLET DOCS)
// //   dispatch added
//   function MyMapComponent() {
//     const map = useMap();
//     dispatch({ type: "getMap", mapData: map });
//     return null;
//   }

//   //DATA FETCHING FROM BACK END WITH CLEAN UP FUNCTIONALITY AND TOKEN GENERATION START.
//   const [allListings, setAllListings] = useState([]);
//   const [dataIsLoading, setDataIsLoading] = useState(true);

//   useEffect(() => {
// //this will generate a token that can be attached to this request.
//     const source = axios.CancelToken.source();
//     const getAllListings = async () => {
//       try {
//         let response = await axios.get("http://localhost:8000/api/listings/", {
//           cancelToken: source.token,
//         });
//         console.log("ALL LISTINGS:", response.data)
//         setAllListings(response.data);
//         setDataIsLoading(false);
//       } catch (error) {
//         console.log(error.response);
//       }
//     };
//     getAllListings();
// //CLEAN UP FUNCTION WITH TOKEN CANCEL START
//     return () => {
//       source.cancel();
//     };
// //CLEAN UP FUNCTION WITH TOKEN CANCEL END
//   }, []);

//   if (dataIsLoading === false) {
//     console.log("DATA:", allListings[0].location);
//   }

//   if (dataIsLoading === true) {
//     return (
//       <Grid
//         container
//         justifyContent="center"
//         alignItems="center"
//         style={{ height: "85vh" }}
//       >
//         <CircularProgress />
//       </Grid>
//     );
//     // to better see this loding animation comment out setDataIsLoading above
//   }
// //DATA FETCHING FROM BACK END WITH CLEAN UP FUNCTIONALITY AND TOKEN GENERATION END.

//   return (
//     <Grid container sx={cardSytles.container}>
//       <Grid item xs={4}>
// {/* START OF LISTING CARD DISPLAY */}
//         {allListings.map((listing) => {
//           return (
//             <Card key={listing.id} sx={cardSytles.card}>
//               <CardHeader
//                 action={
//                   <IconButton
//                     aria-label="settings"                  
//                     onClick={() =>
//                       state.mapInstance.flyTo(
//                         [listing.latitude, listing.longitude],
//                         16
//                       )
//                     }
//                   >
//                     <Room />
//                   </IconButton>
//                 }
// // DISPLAY CARD TITLE
//                 title={listing.title}
//               />
//               <CardMedia
// // DISPLAY CARD IMAGE
//                 component="img"
//                 image={listing.picture1}
//                 alt={listing.title}
// // onClick even to navitage to ListingDetail page                  
//                 onClick={() =>navigate(`/listings/${listing.id}`)}
// //cursor: "pointer"  this will pair with the above onClick to navigate to ListingDetail page                
//                 sx={{ cursor: "pointer" }}
//               />
//               <CardContent>
// {/* Display Card Body */}
//                 <Typography variant="body2">
//                   {listing.description.substring(0, 200)}...
//                 </Typography>
// {/* START CODE BLOCK FOR COMMOA IN  PRICE AND RENTAL VS SALE Ternary operator LOGIC */}
//               </CardContent>
//               {listing.property_status === "Sale" ? (
//                 <Typography sx={cardSytles.price}>
//                   {listing.listing_type}: $
//                   {listing.price
//                     .toString()
//                     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
//                 </Typography>
//               ) : (
//                 <Typography sx={cardSytles.price}>
//                   {listing.listing_type}: $
//                   {listing.price
//                     .toString()
//                     .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
//                   / {listing.rental_frequency}
//                 </Typography>
//               )}
// {/* END CODE BLOCK FOR COMMA IN PRICE AND RENTAL VS SALE LOGIC */}
//               <CardActions disableSpacing>
//             <IconButton aria-label="add to favorites" onClick={() =>navigate(`/listings/${listing.id}`)}>
//               {listing.seller_agency_name}
//             </IconButton>
//           </CardActions>
//             </Card>
//           );
//         })}
//       </Grid>
// {/* END OF LISTING CARD DISPLAY  */}
//       <Grid item xs={8} sx={{ marginTop: "0.5rem" }}>
//         <AppBar position="sticky">
//           <div style={{ height: "100vh" }}>
// {/* Start - code from react-leaflet docs. */}
//             <MapContainer
//               center={[40.65311, -73.944022]}
//               zoom={12}
//               scrollWheelZoom={true}
//             >
//               <TileLayer
//                 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//               />
//               <MyMapComponent />
//               {/* NOTES ON POLYLINE BELOW */}
//               {/* <Polyline positions={polyOne} weight={10} />
//               <Polygon
//                 positions={polygonOne}
//                 color="green"
//                 fillColor="green"
//                 fillOpacity={0.9}
//                 opacity={0}
//               /> */}
// {/* MAP ICON AND POPUP RENDER START */}
//               {allListings.map((listing) => {
//                 function IconDisplay() {
//                   if (listing.listing_type === "House") {
//                     return houseIcon;
//                   } else if (listing.listing_type === "Appartment") {
//                     return apartmentIcon;
//                   } else if (listing.listing_type === "Parking Space") {
//                     return parkingIcon;
//                   } else if (listing.listing_type === "Office"){
//                     return officeIcon;
//                   }
//                 }
//                 return (
// // MAP Marker Render                 
//                   <Marker
//                     key={listing.id}
//                     icon={IconDisplay()}
//                     position={[listing.latitude, listing.longitude,]}
//                   >
//                     <Popup>
//                       <Typography varient="h5">{listing.title}</Typography>
//                       <img
//                         style={{ height: "10rem", width: "15rem", marginLeft: "1.75rem" }}
//                         src={listing.picture1}
//                         alt="listing interior"
//                       />
//                       <Typography varient="body1">
//                         {listing.description.substring(0, 150)}...
//                       </Typography>
//                       <Button variant="contained" fullWidth>
//                         Details{" "}
//                       </Button>
//                     </Popup>
//                   </Marker>
//                 );
//               })}
//   {/* MAP ICON AND POPUP RENDER END */}
//             </MapContainer>
// {/* END code from react-leaflet docs */}
//           </div>
//         </AppBar>
//       </Grid>
//     </Grid>
//   );
// }

// export default Listings;