  import{combineReducers} from 'redux'
	import AuthReducer from './AuthReducer'
	import AuthFacebookReducer from './AuthFacebookReducer'

	export default combineReducers({
		auth:AuthReducer,
		authfb:AuthFacebookReducer
	})
