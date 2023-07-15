import { IChatList, IUser } from "../types/Auth/auth";
import { coordsToDistance } from "./calcDistance";

export const sortFriends = (chatList: IChatList[], friends: IUser[], user: IUser, sort: string): IChatList[] => {
  if (sort === 'alphabet') {
    const sortedChatList = [...chatList].sort((a, b) => {
      const friend1 = friends.find(user => user.id === a.chatId)
      const friend2 = friends.find(user => user.id === b.chatId)

      if (!friend1 || !friend2) {
        return 0
      }
      return friend1.info.nickName.localeCompare(friend2.info.nickName)
    })
    return sortedChatList
  } else if (sort === 'recent') {
    return chatList
  } else if (sort === 'frequency') {
    return [...chatList].sort((a, b) => b.messages.length - a.messages.length)
  } else if (sort === 'unread') {
    const sortedChatList = [...chatList].sort((a, b) => {
      const isRead1 = a.messages[0].isRead
      const isRead2 = b.messages[0].isRead

      if (isRead1 && !isRead2) return 1
      else if (isRead2 && !isRead1) return -1
      else return 0
    })
    return sortedChatList
  } else if (sort === 'distance') {
    const sortedChatList = [...chatList].sort((a, b) => {
      const friend1 = friends.find(user => user.id === a.chatId)
      const friend2 = friends.find(user => user.id === b.chatId)

      if (!friend1 || !friend2) return 0

      const distance1 = coordsToDistance(user.geo.coord, friend1.geo.coord)
      const distance2 = coordsToDistance(user.geo.coord, friend2.geo.coord)

      return distance2 - distance1
    })
    return sortedChatList
  }
  return chatList
}