import { createStore, applyMiddleware } from "redux";
import reducer from "./rootReducer";
import thunkMiddleware from "redux-thunk";
import { createLogger } from "redux-logger";
import { apiMiddleware } from "redux-api-middleware";

const persistedState = localStorage.getItem("state")
  ? JSON.parse(localStorage.getItem("state"))
  : undefined;

const DEBUG = process.env.NODE_ENV === "development";

const compose = (f, g) => a => (g ? f(g(a)) : f(a));

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middlewares = [
  apiMiddleware,
  thunkMiddleware,
  DEBUG && createLogger()
].filter(Boolean);

const middleware = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(reducer, persistedState, middleware);

store.subscribe(() => {
  localStorage.setItem("state", JSON.stringify(store.getState()));
});

export default store;
