import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Provider as ReduxProvider } from "react-redux";
import createStore from "../redux/store";

function App({ Component, extraReducer = {} }) {
  const store = useMemo(() => {
    return createStore(undefined, extraReducer);
  }, [extraReducer]);

  return (
    <React.Fragment>
      <ReduxProvider store={store}>
        <Component />
      </ReduxProvider>
    </React.Fragment>
  );
}

App.propTypes = {
  Component: PropTypes.node,
  extraReducer: PropTypes.objectOf(PropTypes.any),
};

export default App;
