import { IChatList, IUser } from "./auth"

export interface AuthState {
  user: IUser | null,
  chatList: IChatList[]
}

export enum AuthActionTypes {
  SET_USER = 'SET_USER',
  SET_CHAT_LIST = 'SET_CHAT_LIST'
}

interface setUser {
  type: AuthActionTypes.SET_USER,
  payload: IUser | null
}

interface setChatList {
  type: AuthActionTypes.SET_CHAT_LIST,
  payload: IChatList[]
}


export type AuthAction = setUser | setChatList