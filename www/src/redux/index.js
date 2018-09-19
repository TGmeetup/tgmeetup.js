import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import * as api from '../apis';
import * as schema from '../apis/schema';

import reducers from './reducers';

/* eslint-disable no-underscore-dangle, no-mixed-operators  */
const composeEnhancers = process.env.NODE_ENV !== 'production'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  || compose;

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      thunk.withExtraArgument({ api, schema })
    ),
  ),
);
/* eslint-enable */

export default store;
