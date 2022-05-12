import { reducerCases } from './Constants';

export const initialState = {
  user: null
}

const reducer = (state, action) => {
  switch(action.type) {
    case reducerCases.SET_USER: {
      return {
        ...state,
        user: action.user,
      }
    }
    default:
      return state;
  }
};

export default reducer;
