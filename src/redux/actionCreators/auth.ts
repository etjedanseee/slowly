
import { Dispatch } from 'redux';
import { AuthAction, AuthActionTypes } from '../../types/Auth/authReducer';
import { IChatList, ILang, ILetter, IUser, IUserInfo, IUserProfile, interest } from '../../types/Auth/auth';
import supabase from '../../supabaseClient';


export const setUser = (user: IUser | null) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.SET_USER,
      payload: user
    })
  }
}

const updateUser = (user: IUser, updatedUserMetadata: any) => {
  const updatedUser = { ...user, ...updatedUserMetadata }

  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      const { error } = await supabase.auth.updateUser({ data: { ...updatedUserMetadata } })

      const upsertData = await supabase.from('Users')
        .upsert({
          id: user.id,
          ...updatedUserMetadata,
        })

      if (error) {
        throw new Error(error.message)
      }

      dispatch({ type: AuthActionTypes.SET_USER, payload: updatedUser })

      localStorage.setItem('user', JSON.stringify(updatedUser))
      // console.log('success update user', updatedUser)
    } catch (e) {
      console.log('update user error', e)
    }
  }
}

export const updateUserInterests = (user: IUser, updatedInterests: interest[]) => {
  const updatedMetadata = {
    info: user.info,
    interests: updatedInterests,
    languages: user.languages,
    geo: user.geo,
    profile: user.profile
  }

  return updateUser(user, updatedMetadata)
}

export const updateUserLangs = (user: IUser, updatedLangs: ILang[]) => {
  const updatedMetadata = {
    info: user.info,
    interests: user.interests,
    languages: updatedLangs,
    geo: user.geo,
    profile: user.profile
  }

  return updateUser(user, updatedMetadata)
}

export const updateUserInfo = (user: IUser, updatedInfo: IUserInfo) => {
  const updatedMetadata = {
    info: updatedInfo,
    interests: user.interests,
    languages: user.languages,
    geo: user.geo,
    profile: user.profile
  }

  return updateUser(user, updatedMetadata)
}

export const updateUserProfile = (user: IUser, updatedProfile: IUserProfile) => {
  const updatedMetadata = {
    info: user.info,
    interests: user.interests,
    languages: user.languages,
    geo: user.geo,
    profile: updatedProfile
  }

  return updateUser(user, updatedMetadata)
}

export const fetchUserChatList = (id: string, setLoadingChatList: (b: boolean) => void) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      setLoadingChatList(true)

      const { data, error } = await supabase
        .from('Messages')
        .select('*')
        .or('senderId.eq.' + id + ',receiverId.eq.' + id)
        .order('createdAt', { ascending: false })

      if (error) {
        throw new Error(error.message)
      }

      // console.log('successfull get messages', data)
      if (data && data.length > 0) {
        const messages = data as ILetter[]

        const messagesMap = new Map();
        messages.forEach(message => {
          const chatId = message.senderId === id ? message.receiverId : message.senderId;
          if (!messagesMap.has(chatId)) {
            messagesMap.set(chatId, {
              chatId,
              messages: [message]
            });
          } else {
            const prevMessages: IChatList = messagesMap.get(chatId)
            messagesMap.set(chatId, {
              chatId,
              messages: [...prevMessages.messages, message]
            })
          }
        });

        const chatList = Array.from(messagesMap.values())

        console.log('ChatList res', chatList)

        dispatch({ type: AuthActionTypes.SET_CHAT_LIST, payload: chatList })
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoadingChatList(false)
    }
  }
}