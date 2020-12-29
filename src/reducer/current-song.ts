export interface IcurrentSongState {
  id: number;
  url?: string;
  type?: 'mp3' | 'm4a' | string;
  md5?: string;
  coverImg?: string;
}

export interface IAction {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

const initialState: IcurrentSongState = {
  id: 0,
};

const currentSong = (state = initialState, action: IAction) => {
  switch (action.type) {
    case 'currentSong/set': {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default currentSong;
