import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer';


export default (initialState = null) => {
  /* eslint-disable */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  /* eslint-enable */
  let store = {};
  if (process.env.REACT_APP_ENV === 'dev') {
    const enhancer = compose(composeEnhancers(applyMiddleware(thunk)));
    store = createStore(rootReducer, initialState, enhancer);
  } else if (initialState) {
    store = createStore(rootReducer,
      initialState, composeEnhancers(applyMiddleware(thunk)));
  } else {
    store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
  }
  return { store };
};
