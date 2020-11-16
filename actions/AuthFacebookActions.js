import {
    LOGIN_ATTEMPT,
    LOGIN_SUCCESS,
    LOGIN_FAILED
  } from './types';
  import axios from 'axios'
  import { LoginButton, AccessToken, GraphRequestManager, GraphRequest ,LoginManager  } from 'react-native-fbsdk';
  import { AsyncStorage } from 'react-native';
export const  loginFb = () => {

    return(dispatch)=>{

  		dispatch({type:LOGIN_ATTEMPT});
      LoginManager.logInWithReadPermissions(["public_profile","email"]).then(
        function(result) {
          if (result.isCancelled) {
            //console.warn("Login cancelled");
          } else {

            AccessToken.getCurrentAccessToken().then(
                      (data) => {
                        let accessToken = data.accessToken;
                        const responseInfoCallback = (error, result) => {
                setTimeout(()=>{
                                  if (error) {
                                  //  console.warn('1111111111'+error);
                                  //  alert('Error fetching data: ' + error.toString());
                                  } else {

                                      fetch('https://www.betroulette.net/benarous/public/api/loginfb', {
                                        method: 'POST',
                                        headers: {
                                          'Accept': 'application/json',
                                          'Content-Type': 'application/json',
                                        },
                                        body: JSON.stringify({
                                          nom :result.last_name,
                                          prenom:result.first_name,
                                          name: result.name,
                                          email: result.email,
                                          facebook_id: result.id,
                                        }),
                                      }).then((res) => res.json())
                                        .then((response) => {

                                                          handelResponse(dispatch,response)

                                                            })
                                        .catch((error) => {       console.warn('error:'+ error);   });
                                  }
            },200)

                        }

                        const infoRequest = new GraphRequest(
                          '/me',
                          {
                            accessToken: accessToken,
                            parameters: {
                              fields: {
                                string: 'email,name,first_name,middle_name,last_name'
                              }
                            }
                          },
                          responseInfoCallback
                        );
                        // Start the graph request.
                        new GraphRequestManager().addRequest(infoRequest).start();
                      })
                  }
                }, function(error) {
                  console.log("Login fail with error: " + error);
            });



      };
    }

const handelResponse = (dispatch ,data) => {
  console.warn(data)
  if(!data.id){
    console.warn('onloginFailed');
    onloginFailed(dispatch,data.message)
  }else {
    onLoginSuccess(dispatch,data,'token')
  }
}

const onLoginSuccess = (dispatch, user, token) => {
  AsyncStorage.setItem('app_token',token)
    .then(() => {
      dispatch({ type: LOGIN_SUCCESS, user })
    });
};

const onloginFailed = (dispatch,errorMessage) => {
  dispatch({type:LOGIN_FAILED,error:errorMessage})

}
