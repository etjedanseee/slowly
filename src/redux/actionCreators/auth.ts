

import { Dispatch } from 'redux';
import { AuthAction, AuthActionTypes } from '../../types/Auth/authReducer';
import { ILang, IUser, IUserInfo, LetterLengthType, ResponseTimeType, SexType, interest } from '../../types/Auth/auth';
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

export const updateUserAvatar = (user: IUser, imageUrl: string) => {
  const updatedMetadata = {
    info: {
      ...user.info,
      avatarUrl: imageUrl
    },
    interests: user.interests,
    languages: user.languages,
    geo: user.geo,
    profile: user.profile
  }

  return updateUser(user, updatedMetadata)
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

export const updateUserLetterLength = (user: IUser, updatedLL: LetterLengthType) => {
  const updatedMetadata = {
    info: user.info,
    interests: user.interests,
    languages: user.languages,
    geo: user.geo,
    profile: {
      ...user.profile,
      letterLength: updatedLL
    }
  }

  return updateUser(user, updatedMetadata)
}

export const updateUserResponseTime = (user: IUser, updatedRT: ResponseTimeType) => {
  const updatedMetadata = {
    info: user.info,
    interests: user.interests,
    languages: user.languages,
    geo: user.geo,
    profile: {
      ...user.profile,
      responseTime: updatedRT
    }
  }

  return updateUser(user, updatedMetadata)
}

export const updateUserSexPreference = (user: IUser, updatedPS: SexType[]) => {
  const updatedMetadata = {
    info: user.info,
    interests: user.interests,
    languages: user.languages,
    geo: user.geo,
    profile: {
      ...user.profile,
      sexPreference: updatedPS
    }
  }

  return updateUser(user, updatedMetadata)
}


export const updateUserBiography = (user: IUser, updatedBiography: string) => {
  const updatedMetadata = {
    info: user.info,
    interests: user.interests,
    languages: user.languages,
    geo: user.geo,
    profile: {
      ...user.profile,
      biography: updatedBiography
    }
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