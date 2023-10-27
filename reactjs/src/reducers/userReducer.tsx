import {
  SET_EMAIL,
  SET_AUD,
  SET_JTI,
  SET_CUR_PAGE,
} from '../actionTypes';

export interface UserState {
  email: string;
  aud: string;
  jti: string;
  cur_page: string;
}

const initialState = {
    email: '',
    aud: '',
    jti: '',
    cur_page: ''
  };

  
  const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case SET_EMAIL:
        return { ...state, email: action.payload };
      case SET_AUD:
        return { ...state, aud: action.payload };
      case SET_JTI:
        return { ...state, jti: action.payload };
      case SET_CUR_PAGE:
        return { ...state, cur_page: action.payload };
      default:
        return state;
    }
  }
  
  export default userReducer
  