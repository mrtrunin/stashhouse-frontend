import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

const DEBUG = true;
const compose = (f, g) => a => f(g(a));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = DEBUG
  ? composeEnhancers(applyMiddleware(createLogger(), thunkMiddleware))
  : undefined;

const store = createStore(reducer, persistedState, middleware);

store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
