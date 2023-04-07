
import { AuthState, AuthAction, AuthActionTypes } from './../../types/Auth/authReducer';


const initialState: AuthState = {
  user: null,
}

export const authReducer = (state = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case AuthActionTypes.SET_USER: {
      return {
        ...state,
        user: action.payload
      }
    }
    default: return state
  }
}