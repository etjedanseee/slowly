import supabase from "../supabaseClient";
import { IUser } from "../types/Auth/auth";
import { toast } from 'react-toastify'


export const fetchUserById = async (id: string, setOtherUser: (user: IUser) => void, errorMessage: string) => {
  try {
    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('id', id)

    if (error) {
      console.log(error);
      toast.error(errorMessage)
      throw new Error(error.message)
    }

    if (data && data.length > 0) {
      const otherUser = data[0] as IUser;
      setOtherUser(otherUser)
    }

  } catch (e) {
    console.log('fetch user by id error', e)
  }
}