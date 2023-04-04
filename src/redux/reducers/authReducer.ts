import { AuthState } from './../../types/Auth/authReducer';

const initialState: AuthState = {
  user: null
}

export const authReducer = (state = initialState): AuthState => {
  return state
}