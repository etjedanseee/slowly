import { IChatList } from "../types/Auth/auth";

export const sortFriends = (chatList: IChatList[], sort: string): IChatList[] => {
  if (sort === 'alphabet') {

  } else if (sort === 'recent') {
    return chatList
  } else if (sort === 'frequency') {

  } else if (sort === 'unread') {

  } else if (sort === 'distance') {

  } else {
    return chatList
  }
  return chatList
}