import { combineReducers } from 'redux';
import songReducer from './song/reducers';

const rootReducer = combineReducers({ song: songReducer });

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
