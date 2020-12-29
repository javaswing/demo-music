import { combineReducers } from 'redux';

import currentSong from './current-song';

const rootReducer = combineReducers(currentSong);

export default rootReducer;
