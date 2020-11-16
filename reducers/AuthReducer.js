import {
    LOGIN_ATTEMPT,
    LOGIN_SUCCESS,
    LOGIN_FAILED
  } from '../actions/types';


const INITIAL_STATE ={user: null,loading:false,error:false }
export default (state = INITIAL_STATE ,action) =>{
  //  console.warn(action);
	switch(action.type){

        case LOGIN_ATTEMPT:{
            return {...INITIAL_STATE,loading:true,error:false }
            break;
        }
        case LOGIN_FAILED:{
            return {...INITIAL_STATE,loading:false,error:true }
        }
        case LOGIN_SUCCESS:{
            return {...INITIAL_STATE,loading:false,user:action.user,error:false}
        }
		default:{
            return  state;
            break;
        }

	}
}
