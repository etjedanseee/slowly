import { interest } from "../Auth/auth"

export interface DataState {
  interests: interest[],
}

export enum DataActionTypes {
  SET_INTERESTS = 'SET_INTERESTS',
}

interface setInterests {
  type: DataActionTypes.SET_INTERESTS,
  payload: interest[]
}



export type DataAction = setInterests