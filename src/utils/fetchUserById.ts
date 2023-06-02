import supabase from "../supabaseClient";
import { IUser } from "../types/Auth/auth";

export const fetchUserById = async (id: string, setOtherUser: (user: IUser) => void, setUserSearchError: (error: string) => void) => {
  try {
    const { data, error } = await supabase
      .from('Users')
      .select('*')
      .eq('id', id)

    if (error) {
      console.log(error);
      setUserSearchError('No match user. Check ID')
      throw new Error(error.message)
    }

    if (data && data.length > 0) {
      const otherUser = data[0] as IUser;
      setOtherUser(otherUser)
      setUserSearchError('')
    }

  } catch (e) {
    console.log('fetch user by id error', e)
  }
}

export const fetchUsersById = async (ids: string[], setUsers: (users: IUser[]) => void) => {
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
      const usersArr = data as IUser[];
      setUsers(usersArr)
    }

  } catch (e) {
    console.log('fetch users by id error', e)
  }
}