
import { Dispatch } from 'redux';
import { AuthAction, AuthActionTypes } from '../../types/Auth/authReducer';
import { IChatList, ILang, ILetter, IUser, IUserInfo, IUserProfile, IUserSettings, interest } from '../../types/Auth/auth';
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

      const { error: upsertError } = await supabase.from('Users')
        .upsert({
          id: user.id,
          ...updatedUserMetadata,
        })

      const errorMessage = error?.message || upsertError?.message

      if (errorMessage) {
        throw new Error(errorMessage)
      }

      dispatch({ type: AuthActionTypes.SET_USER, payload: updatedUser })
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
    profile: user.profile,
    settings: user.settings
  }

  return updateUser(user, updatedMetadata)
}

export const updateUserLangs = (user: IUser, updatedLangs: ILang[]) => {
  const updatedMetadata = {
    info: user.info,
    interests: user.interests,
    languages: updatedLangs,
    geo: user.geo,
    profile: user.profile,
    settings: user.settings
  }

  return updateUser(user, updatedMetadata)
}

export const updateUserInfo = (user: IUser, updatedInfo: IUserInfo) => {
  const updatedMetadata = {
    info: updatedInfo,
    interests: user.interests,
    languages: user.languages,
    geo: user.geo,
    profile: user.profile,
    settings: user.settings
  }

  return updateUser(user, updatedMetadata)
}

export const updateUserProfile = (user: IUser, updatedProfile: IUserProfile) => {
  const updatedMetadata = {
    info: user.info,
    interests: user.interests,
    languages: user.languages,
    geo: user.geo,
    profile: updatedProfile,
    settings: user.settings
  }

  return updateUser(user, updatedMetadata)
}

export const updateUserSettings = (user: IUser, updatedSettings: IUserSettings) => {
  const updatedMetadata = {
    info: user.info,
    interests: user.interests,
    languages: user.languages,
    geo: user.geo,
    profile: user.profile,
    settings: updatedSettings
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
        // console.log('ChatList res', chatList)

        dispatch({ type: AuthActionTypes.SET_CHAT_LIST, payload: chatList })
      }
    } catch (e) {
      console.log(e)
    } finally {
      setLoadingChatList(false)
    }
  }
}

export const fetchFriends = (ids: string[]) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      const { data, error } = await supabase
        .from('Users')
        .select('*')
        .in('id', ids);

      if (error) {
        console.log(error);
        throw new Error(error.message)
      }

      if (data && data.length > 0) {
        const friends = data as IUser[];
        dispatch({ type: AuthActionTypes.SET_FRIENDS, payload: friends })
      }
    } catch (e) {
      console.log('fetch friends error', e)
    }
  }
}