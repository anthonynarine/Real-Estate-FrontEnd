import { Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import ny1 from "../assets/backgroundImages/ny1.jpg"




function Home() {
  return (
   <Box width="100%" height="100vh" >
    <Typography sx={{position: "absolute", top: "0px" }}>
      <Toolbar />
      <Toolbar />
    Find your next home in the big apple
    </Typography>
    <img src={ny1} alt="city" width={"100%"} height="100%" />
   </Box>
  );
}

export default Home;
