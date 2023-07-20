import supabase from "../supabaseClient";
import { IUser } from "../types/Auth/auth";

export const fetchUserById = async (id: string, setOtherUser: (user: IUser) => void, setFetchError: (b: boolean) => void) => {
  try {
    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('id', id)

    if (error) {
      console.log(error);
      setFetchError(true)
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