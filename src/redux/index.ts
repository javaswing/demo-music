import { combineReducers } from 'redux';
import playerReducer from './player/reducers';
import appReducer from './app';
import lrcReducer from './player/lrc';

const rootReducer = combineReducers({ player: playerReducer, app: appReducer, lrc: lrcReducer });

export default rootReducer;
