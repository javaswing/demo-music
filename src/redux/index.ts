import { combineReducers } from 'redux';
import playerReducer from './player/reducers';
import appReducer from './app';

const rootReducer = combineReducers({ player: playerReducer, app: appReducer });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
