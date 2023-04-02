
import { combineReducers } from "redux";
import { themeReducer } from './themeReducer'

export const rootReducer = combineReducers({
  theme: themeReducer
})

export type RootState = ReturnType<typeof rootReducer>
