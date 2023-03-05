

<Grid container sx={ADStyling.listingsContainer}>
<Grid item>
  {state.userProfile.sellerListings.map((listing) => {
    return (
      <Grid key={listing.id} item>
        <Paper elevation={24}>
          <Card sx={{ maxWidth: 345, height: 350 }}>
            <CardMedia
              component="img"
              alt="profile picture"
              height="140"
              // if listing.picture1 exist we want to return it if that's not the case we return defaultProfilePicture
              image={
                listing.picture1
                  ? listing.picture1
                  : defaultProfilePicture
              }
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {listing.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {/* substring(0,100) will allow the 1st 100 charachers in the bio to be displayed */}
                {listing.description(0, 100)}...
              </Typography>
            </CardContent>
            {/* This function will render a different note based on the amount of properties a user has listed (see function above) */}
            <CardActions>${listing.price}</CardActions>
          </Card>
        </Paper>
      </Grid>
    );
  })}
</Grid>
</Grid>