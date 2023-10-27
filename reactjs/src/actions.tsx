import {
    SET_EMAIL,
    SET_AUD,
    SET_JTI,
    SET_CUR_PAGE,
  } from './actionTypes';
  
  export const setEmail = (email: any) => ({
    type: SET_EMAIL,
    payload: email,
  });
  
  export const setAud = (aud: any) => ({
    type: SET_AUD,
    payload: aud,
  });
  
  export const setJti = (jti: any) => ({
    type: SET_JTI,
    payload: jti,
  });
  
  export const setCurPage = (curPage: any) => ({
    type: SET_CUR_PAGE,
    payload: curPage,
  });