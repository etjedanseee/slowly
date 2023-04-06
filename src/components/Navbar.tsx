import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ReactComponent as HomeIcon } from '../assets/house.svg'
import { ReactComponent as LetterIcon } from '../assets/letter.svg'
import { ReactComponent as FriendIcon } from '../assets/addFriend.svg'
import { ReactComponent as PencilIcon } from '../assets/pencil.svg'
import { ReactComponent as MenuIcon } from '../assets/menu.svg'


const Navbar = () => {
  const { theme } = useTypedSelector(state => state.theme)

  const location = useLocation()

  return (
    <div className={`
      fixed left-0 bottom-0 z-40 w-full py-2 flex items-center justify-around 
      ${theme === 'dark' ? 'bg-black' : 'bg-white'}
    `}>
      <NavLink to='/'>
        <HomeIcon className={`h-8 w-8 ${location.pathname === '/' ? theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900' : 'fill-gray-500'}`} />
      </NavLink>
      <NavLink to='/friends'>
        <LetterIcon className={`h-9 w-9 ${location.pathname === '/friends' ? theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900' : 'fill-gray-500'}`} />
      </NavLink>
      <NavLink to='/search'>
        <FriendIcon className={`h-8 w-8 ${location.pathname === '/search' ? theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900' : 'fill-gray-500'}`} />
      </NavLink>
      <NavLink to='/draft'>
        <PencilIcon className={`h-8 w-8 ${location.pathname === '/draft' ? theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900' : 'fill-gray-500'}`} />
      </NavLink>
      <NavLink to='/profile'>
        <MenuIcon className={`h-8 w-8 ${location.pathname === '/menu' ? theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900' : 'fill-gray-500'}`} />
      </NavLink>
    </div>
  )
}

export default Navbar