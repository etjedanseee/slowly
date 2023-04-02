import React from 'react'
import { NavLink } from 'react-router-dom'

const MenuPage = () => {
  return (
    <div>
      <div>MenuPage</div>
      <NavLink to='/menu/settings'>
        Settings
      </NavLink>
    </div>
  )
}

export default MenuPage