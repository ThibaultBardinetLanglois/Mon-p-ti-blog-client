import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import reducers from "./reducers";

// dev tools
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'

const store = createStore(
  reducers, composeWithDevTools(applyMiddleware(thunk, logger))
);

export default store;