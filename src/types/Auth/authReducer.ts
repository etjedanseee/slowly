import { IChatList, IUser } from "./auth"

export interface AuthState {
  user: IUser | null,
  chatList: IChatList[],
  friends: IUser[],
}

export enum AuthActionTypes {
  SET_USER = 'SET_USER',
  SET_CHAT_LIST = 'SET_CHAT_LIST',
  SET_FRIENDS = 'SET_FRIENDS'
}

interface setUser {
  type: AuthActionTypes.SET_USER,
  payload: IUser | null
}

interface setChatList {
  type: AuthActionTypes.SET_CHAT_LIST,
  payload: IChatList[]
}

interface setFriends {
  type: AuthActionTypes.SET_FRIENDS,
  payload: IUser[]
}


export type AuthAction = setUser | setChatList | setFriends