import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import createStore from "/originLib/redux/store";

// examples
import ExButton from "./__button__/ExButton";
import ExRedux from "./__redux__/ExRedux";
import ExQuickSort from "./__sort__/ExQuickSort";
import ExBubbleSort from "./__sort__/ExBubbleSort";
import ExCartesian from "./__cartesian__/ExCartesian";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore();

root.render(
  <React.Fragment>
    <ExButton />
    {/*<Provider store={store}>*/}
    {/*  <ExRedux />*/}
    {/*</Provider>*/}
    {/*<ExQuickSort />*/}
    {/*<ExBubbleSort />*/}
    <ExCartesian />
  </React.Fragment>
);
