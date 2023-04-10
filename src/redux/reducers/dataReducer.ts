import { DataAction, DataActionTypes } from './../../types/Data/dataReducer';
import { DataState } from "../../types/Data/dataReducer"

const initialState: DataState = {
  interests: []
}

export const dataReducer = (state = initialState, action: DataAction): DataState => {
  switch (action.type) {
    case DataActionTypes.SET_INTERESTS: {
      return {
        ...state,
        interests: action.payload
      }
    }
    default: return state
  }
}