import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import rootReducer from '@/redux';

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
