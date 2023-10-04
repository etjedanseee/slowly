import { User } from "@supabase/supabase-js"
import { IUser } from "../types/Auth/auth"
import { initialUserInfo, initialUserProfile } from "./consts"

export const getPropertiesForUserFromSbUser = (sbUser: User | null) => {
  const user: IUser = {
    id: sbUser?.id || '0',
    email: sbUser?.email || '0',
    info: sbUser?.user_metadata?.info || initialUserInfo,
    interests: sbUser?.user_metadata?.interests || [],
    languages: sbUser?.user_metadata?.languages || [],
    geo: sbUser?.user_metadata?.geo || { coord: { latitude: 0, longitude: 0 }, location: { country: '', city: '' } },
    profile: sbUser?.user_metadata?.profile || initialUserProfile,
    settings: sbUser?.user_metadata?.settings || { appLang: 'en', isConfirmBeforeSendLetter: true, theme: 'dark' }
  }
  return user
}