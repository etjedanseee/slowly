import { IChatList, IUser } from "../types/Auth/auth";
import { coordsToDistance } from "./calcDistance";

export const sortChatList = (chatList: IChatList[], friends: IUser[], user: IUser, sort: string): IChatList[] => {
  const copyChatList = [...chatList]
  if (sort === 'alphabet') {
    const sortedChatList = copyChatList.sort((a, b) => {
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
    return copyChatList.sort((a, b) => b.messages.length - a.messages.length)
  } else if (sort === 'unread') {
    return copyChatList.sort((a, b) => +a.messages[0].isRead - +b.messages[0].isRead)
  } else if (sort === 'distance') {
    const sortedChatList = copyChatList.sort((a, b) => {
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