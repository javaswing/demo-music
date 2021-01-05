import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '@/reducers';

const composedEnhancer = composeWithDevTools(
  // 添加其它的middleware
  applyMiddleware()
  // other store enhancers if any
);

const store = createStore(rootReducer, composedEnhancer);

export default store;
