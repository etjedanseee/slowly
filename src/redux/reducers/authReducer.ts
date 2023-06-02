
import { AuthState, AuthAction, AuthActionTypes } from './../../types/Auth/authReducer';


const initialState: AuthState = {
  user: null,
  chatList: []
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SET_USER: {
      return {
        ...state,
        user: action.payload
      }
    }
    case AuthActionTypes.SET_CHAT_LIST: {
      return {
        ...state,
        chatList: action.payload
      }
    }
    default: return state
  }
}