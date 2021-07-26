import { combineReducers } from 'redux';
import playerReducer from './player';
import appReducer from './app';
import lrcReducer from './lrc';

const rootReducer = combineReducers({ player: playerReducer, app: appReducer, lrc: lrcReducer });

export default rootReducer;
