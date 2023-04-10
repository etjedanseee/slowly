

import { Dispatch } from 'redux';
import { AuthAction, AuthActionTypes } from '../../types/Auth/authReducer';
import { ILang, IUser, LetterLengthType, ResponseTimeType, SexType, interest } from '../../types/Auth/auth';
import supabase from '../../supabaseClient';


export const setUser = (user: IUser | null) => {
  return (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.SET_USER,
      payload: user
    })
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

  const updatedUser = { ...user, ...updatedMetadata }

  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      const { data, error } = await supabase.auth.updateUser({ data: { ...updatedMetadata } })

      if (error) {
        throw new Error(error.message)
      }

      dispatch({ type: AuthActionTypes.SET_USER, payload: updatedUser })

      localStorage.setItem('user', JSON.stringify(updatedUser))
      // console.log('success update image', updatedUser)
    } catch (e) {
      console.log('update user image error', e)
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

  const updatedUser = { ...user, ...updatedMetadata }

  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      const { data, error } = await supabase.auth.updateUser({ data: { ...updatedMetadata } })

      if (error) {
        throw new Error(error.message)
      }

      dispatch({ type: AuthActionTypes.SET_USER, payload: updatedUser })

      localStorage.setItem('user', JSON.stringify(updatedUser))
      // console.log('success update interests', updatedUser)
    } catch (e) {
      console.log('update user interests error', e)
    }
  }
}

export const updateUserLangs = (user: IUser, updatedLangs: ILang[]) => {
  const updatedMetadata = {
    info: user.info,
    interests: user.interests,
    languages: updatedLangs,
    geo: user.geo,
    profile: user.profile
  }
  const updatedUser = { ...user, ...updatedMetadata }

  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      const { data, error } = await supabase.auth.updateUser({ data: { ...updatedMetadata } })

      if (error) {
        throw new Error(error.message)
      }

      dispatch({ type: AuthActionTypes.SET_USER, payload: updatedUser })

      localStorage.setItem('user', JSON.stringify(updatedUser))
      // console.log('success update langs', updatedUser)
    } catch (e) {
      console.log('update user langs error', e)
    }
  }
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
  const updatedUser = { ...user, ...updatedMetadata }

  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      const { data, error } = await supabase.auth.updateUser({ data: { ...updatedMetadata } })

      if (error) {
        throw new Error(error.message)
      }

      dispatch({ type: AuthActionTypes.SET_USER, payload: updatedUser })

      localStorage.setItem('user', JSON.stringify(updatedUser))
      // console.log('success update letterLength', updatedUser)
    } catch (e) {
      console.log('update user letterLength error', e)
    }
  }
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
  const updatedUser = { ...user, ...updatedMetadata }

  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      const { data, error } = await supabase.auth.updateUser({ data: { ...updatedMetadata } })

      if (error) {
        throw new Error(error.message)
      }
      dispatch({ type: AuthActionTypes.SET_USER, payload: updatedUser })

      localStorage.setItem('user', JSON.stringify(updatedUser))
      // console.log('success update responceTime', updatedUser)
    } catch (e) {
      console.log('update user responceTime error', e)
    }
  }
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

  const updatedUser = { ...user, ...updatedMetadata }

  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      const { data, error } = await supabase.auth.updateUser({ data: { ...updatedMetadata } })

      if (error) {
        throw new Error(error.message)
      }
      dispatch({ type: AuthActionTypes.SET_USER, payload: updatedUser })

      localStorage.setItem('user', JSON.stringify(updatedUser))
      // console.log('success update sexPreference', updatedUser)
    } catch (e) {
      console.log('update user sexPreference error', e)
    }
  }
}
