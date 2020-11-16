import {
    LOGIN_ATTEMPT,
    LOGIN_SUCCESS,
    LOGIN_FAILED
  } from './types';
  import axios from 'axios'
  import { AsyncStorage } from 'react-native';
export const loginUser =({email,password}) => {

	return(dispatch)=>{
		dispatch({type:LOGIN_ATTEMPT});
		axios.post('https://www.betroulette.net/benarous/public/api/login',{
		email,password
    }).then(resp=> handelResponse(dispatch,resp.data))
    .catch(error => console.warn(error))
  };

}

const handelResponse = (dispatch ,data) => {
  //console.warn(data)
  if(!data.success){
    onloginFailed(dispatch,data.message)
  }else {
    onLoginSuccess(dispatch,data.user,data.token.access_token)
  //  console.warn(data.token.access_token)
  }
}

const onLoginSuccess = (dispatch, user, token) => {

  AsyncStorage.setItem('app_token',token)
    .then(() => {
      dispatch({ type: LOGIN_SUCCESS, user })
    });
};

const onloginFailed = (dispatch,errorMessage) => {
 //console.warn('LOGIN_FAILED'+errorMessage)
  dispatch({type:LOGIN_FAILED,error:errorMessage})

}
