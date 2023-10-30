import { toast } from "react-toastify"
import supabase from "../supabaseClient"
import { getPropertiesForUserFromSbUser } from "./getPropertiesForUserFromSbUser"
import { IUser } from "../types/Auth/auth"
import { Dispatch } from "redux"
import { AuthAction } from "../types/Auth/authReducer"

interface signInProps {
  email: string,
  password: string,
  setLoading: (b: boolean) => void,
  t: (s: string) => string,
  setUser: (user: IUser | null) => (dispatch: Dispatch<AuthAction>) => void,
  navigate: (s: string) => void
}

export const singIn = async ({ email, password, setLoading, t, navigate, setUser }: signInProps) => {
  setLoading(true)
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email?.trim() || '',
      password: password?.trim() || '',
    })
    console.log('singIn data', data)

    if (error) {
      toast.error(t('wrongEmailOrPassword'))
      throw new Error(error.message)
    }

    const user = getPropertiesForUserFromSbUser(data.user)
    setUser(user)
    navigate('/')
  } catch (e) {
    console.log('singIn error', e)
  } finally {
    setLoading(false)
  }
}