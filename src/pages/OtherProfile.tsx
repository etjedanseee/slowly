import React, { useEffect, useState } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useParams } from 'react-router-dom'
import UserAvatar from '../components/UserAvatar'
import supabase from '../supabaseClient'
import { IUser } from '../types/Auth/auth'

const OtherProfile = () => {
  const { theme } = useTypedSelector(state => state.theme)
  const { id } = useParams()
  const [otherUser, setOtherUser] = useState<IUser | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      // const { data, error } = await supabase.auth.admin.getUserById(id || '1')
      const { data, error } = await supabase.from('Users')
        .select('*')
        .eq('id', id);

      console.log('other user fetch', data);

      if (error) {
        console.error(error);
      } else {
        // setOtherUser(data);
      }
    };
    fetchUser()
  }, [id])

  if (!otherUser) return null

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-slate-200 text-zinc-900'} py-3`}>
      <div className='px-2 relative mb-3'>
        <UserAvatar
          userAvatar={otherUser.info.avatarUrl}
          theme={theme}
          canUpdate={false}
        />
      </div>
    </div>
  )
}

export default OtherProfile