import React from 'react'
import { NavLink } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Profile = () => {
  return (
    <div>
      <div>Profile</div>
      <NavLink to='/profile/settings'>
        Settings
      </NavLink>
      <Navbar />
    </div>
  )
}

export default Profile