Include Leaflet CSS file in the head (index.html) section of your document:


//DATA FETCHING FROM BACK END WITH CLEAN UP FUNCTIONALITY AND TOKEN GENERATION START.
  const [allListings, setAllListings] = useState([]);
  const [dataIsLoading, setDataIsLoading] = useState(true);

  useEffect(() => {
    //this will generate a token that can be attached to this request. 
    const source = axios.CancelToken.source();
    const getAllListings = async () => {
      try {
        let response = await axios.get("http://127.0.0.1:8000/api/listings/", {cancelToken: source.token});
        // console.log("DATA ARRAY:", response.data)
        setAllListings(response.data);
        setDataIsLoading(false)
      } catch (error) {
        console.log(error.response);
      }
    };
    getAllListings();
    //CLEAN UP FUNCTION WILL RUN WHEN THE COMPONENT IS UNMOUNTED CANCELING THE TOKEN WHICH WILL CANCEL THE AXIOS REQUEST. (SEE LECTURE 52)
    return() => {
      source.cancel();
    };
    //CLEAN UP FUNCTION END
  }, []);

  if (dataIsLoading === false) {
    console.log("DATA ARRAY:", allListings[0].location);
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

                                        Clan up function        
line 16, 29-40 the clean up funtionality will only render data after is has finished loading to avoid errors.  
CLEAN UP FUNCTION WILL RUN WHEN THE COMPONENT IS UNMOUNTED CANCELING THE TOKEN WHICH WILL CANCEL THE AXIOS REQUEST. (SEE LECTURE 52)
The token is requested on the get request as show above and cancled as shown in the return statement after the function call (line 23)
The token is stored in the variable source (see below use effect call)
