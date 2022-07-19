import React from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import store from "../redux/store";

function App({ Component, pageProps = {} }) {
  return (
    <React.Fragment>
      <Provider store={store}>
        <Component />
      </Provider>
    </React.Fragment>
  );
}

App.propTypes = {
  Component: PropTypes.node,
};

export default App;
