
import { combineReducers } from "redux";
import { themeReducer } from './themeReducer'
import { authReducer } from './authReducer'

export const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer
})

export type RootState = ReturnType<typeof rootReducer>
