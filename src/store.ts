import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '@/reducers';
import { createLogger } from 'redux-logger';

const middleware = [];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}

const composedEnhancer = composeWithDevTools(
  // 添加其它的middleware
  applyMiddleware(...middleware)
  // other store enhancers if any
);

const store = createStore(rootReducer, composedEnhancer);

export default store;
