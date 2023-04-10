
import { combineReducers } from "redux";
import { themeReducer } from './themeReducer'
import { authReducer } from './authReducer'
import { dataReducer } from './dataReducer'

export const rootReducer = combineReducers({
  theme: themeReducer,
  auth: authReducer,
  data: dataReducer,
})

export type RootState = ReturnType<typeof rootReducer>
