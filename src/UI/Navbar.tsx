import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ReactComponent as HouseIcon } from '../assets/navbarIcons/house.svg'
import { ReactComponent as LetterIcon } from '../assets/navbarIcons/letter.svg'
import { ReactComponent as SearchIcon } from '../assets/navbarIcons/search.svg'
import { ReactComponent as PencilIcon } from '../assets/navbarIcons/pencil.svg'
import { ReactComponent as UserIcon } from '../assets/navbarIcons/user.svg'

const Navbar = () => {
  const { theme } = useTypedSelector(state => state.theme)

  const location = useLocation()

  return (
    <div className={`
      fixed left-0 nMb:left-1/2 nMb:-translate-x-1/2 nMb:max-w-[425px] bottom-0 z-40 w-full py-2 flex items-center justify-around 
      ${theme === 'dark' ? 'bg-black' : 'bg-white'}
    `}>
      <NavLink to='/'>
        <HouseIcon className={`h-8 w-8  ${location.pathname === '/' ? theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900' : 'fill-gray-500'}`} />
      </NavLink>
      <NavLink to='/search'>
        <SearchIcon className={`h-8 w-8 -mb-1 ${location.pathname === '/search' ? theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900' : 'fill-gray-500'}`} />
      </NavLink>
      <NavLink to='/friends'>
        <LetterIcon className={`h-10 w-10 -mb-1 ${location.pathname === '/friends' ? theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900' : 'fill-gray-500'}`} />
      </NavLink>
      <NavLink to='/draft'>
        <PencilIcon className={`h-7 w-7 ${location.pathname === '/draft' ? theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900' : 'fill-gray-500'}`} />
      </NavLink>
      <NavLink to='/profile'>
        <UserIcon className={`h-10 w-10 ${location.pathname === '/profile' ? theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900' : 'fill-gray-500'}`} />
      </NavLink>
    </div>
  )
}

export default Navbar