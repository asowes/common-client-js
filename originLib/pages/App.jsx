import React, { useMemo } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider as ReduxProvider } from "react-redux";
import createStore from "../redux/store";

function App({ Component, extraReducer = {} }) {
  const store = useMemo(() => {
    return createStore(undefined, extraReducer);
  }, [extraReducer]);

  return (
    <React.Fragment>
      <ChakraProvider>
        <ReduxProvider store={store}>
          <Component />
        </ReduxProvider>
      </ChakraProvider>
    </React.Fragment>
  );
}

export default App;
