import { combineReducers } from 'redux';
import currentSong from './song';

const rootReducer = combineReducers({ currentSong });

export type RootState = typeof rootReducer;
export default rootReducer;
