import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  createStore,
  applyMiddleware,
  Store,
  combineReducers,
  Action,
} from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import organizationReducer from "./store/reducers/organizationReducer";
import politicianReducer from "./store/reducers/politicianReducer";

const rootReducer = combineReducers({
  organizations: organizationReducer,
  politicians: politicianReducer,
});

// Initialize the store
const store: Store<DataState, Action> & {
  dispatch: DispatchType;
} = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
