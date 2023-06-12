import React from 'react'
import Navbar from '../components/Navbar'
import { useActions } from '../hooks/useActions'
import { ReactComponent as MoonIcon } from '../assets/moon.svg'
import { ReactComponent as SunIcon } from '../assets/sun.svg'
import { useTypedSelector } from '../hooks/useTypedSelector'

const Home = () => {
  const { theme } = useTypedSelector(state => state.theme)
  const { switchTheme } = useActions()

  const onSwitchTheme = () => {
    switchTheme()
  }

  return (
    <div className="relative p-4" >
      <div className='flex justify-end mb-4'>
        {theme === 'white'
          ? <SunIcon className='h-10 w-10 fill-black' onClick={onSwitchTheme} />
          : <MoonIcon className='h-9 w-9 fill-white' onClick={onSwitchTheme} />}
      </div>

      <div>Home</div>
      <Navbar />
    </div>
  )
}

export default Home