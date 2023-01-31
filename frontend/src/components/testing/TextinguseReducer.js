import { React, useEffect, useState } from "react";
import { Button, Toolbar, Typography } from "@mui/material";


// useEffect testing start 

const TestinguseReducer = () => {
  const [count, setCount] = useState(0);

  // useEffect(() => {}, []);

  useEffect(() =>{
    console.log(`The current count is : ${count}`);
  }, [count])
  // we are telling react to conosle log count whenever it changes

  function increaseCount() {
    setCount((current) => current + 1);
  }

  function decreaseCount() {
    setCount((current) => current - 1);
  }

  return (
    <div>
  {/* Toolbar used as padding ;] */}
      <Toolbar><Typography variant="h6" >The Current Count is : {count}</Typography></Toolbar>
      <Button
        onClick={increaseCount}
        sx={{ marginLeft: 1.5, background: "rgba(158,135,163,1)" }}
        variant="contained"
      >
        Increase
      </Button>
      <br />
      <Button
        onClick={decreaseCount}
        sx={{ marginLeft: 1.5, background: "rgba(158,135,163,1)" }}
        variant="contained"
      >
        Decrease
      </Button>
    </div>
  );
};

export default TestinguseReducer;

//  useEffect
// use effect takes in two arguments the 1st first is a function
// the 2nd is the change we are watching most of the time we
// watch for a change in state.

