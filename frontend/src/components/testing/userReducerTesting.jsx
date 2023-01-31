
import React, { useReducer } from 'react';
import { useImmerReducer } from "use-immer"



//useReducer testing start\\
function useReducerTesting() {
    const initialState = {
      appleCount: 1,
      bananaCount: 10,
      message: "Hello",
      happy: false,
    };
    //reducer takes in 2 parameters state and action
    //action works with the dispatch used in useReducer below
    function ReducerFunction(state, action) {
      // eslint-disable-next-line default-case
      switch (action.type) {
        case "addApple":
          return {
            appleCount: state.appleCount + 1,
            bananaCount: state.bananaCount,
            message: state.message,
            happy: state.happy,
          };
        case "changeEverything":
          return {
            appleCount: state.appleCount + 10,
            bananaCount: state.bananaCount - 50,
            message: action.customMessage,
            happy: "true",
          };
      }
    }
  
    const [state, dispatch] = useReducer(ReducerFunction, initialState);
  
    return (
      <>
        <div>
          Right now the count of apple is {state.appleCount}
          <br />
          Right now the count of banana is {state.bananaCount}
          <br />
          Right now the message is {state.message}
          {state.happy ? (
            <h1>Thank you for being happy</h1>
          ) : (
            <h1>There is no happiness</h1>
          )}
          <br />
          <button onClick={() => dispatch({ type: "addApple" })}>
            Add Apple
          </button>
          <br />
          <button onClick={() => dispatch({ type: "changeEverything", customMessage: "this message is now coming from the dispatch" })}>
            changeEverything
          </button>
        </div>
      </>
    );
  }
  
  export default useReducerTesting;
  