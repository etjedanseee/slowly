import { IChatList, ILetter, IUser } from "../types/Auth/auth"

export const filterRecentlyAndOnWayLetters = (chatList: IChatList[], user: IUser) => {
  const resRecentlyLetters: ILetter[] = []
  const resLettersOnWay: ILetter[] = []
  chatList.forEach(chat => {
    for (let letter of chat.messages) {
      if (letter.receiverId !== user.id) {
        continue
      }
      if (+new Date(letter.deliveredDate) < Date.now()) {
        resRecentlyLetters.push(letter)
      } else {
        resLettersOnWay.push(letter)
      }
    }
  })
  return [resRecentlyLetters, resLettersOnWay]
}