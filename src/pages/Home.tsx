import React from 'react'
import Navbar from '../components/Navbar'
import { useActions } from '../hooks/useActions'
import MyButton from '../UI/MyButton'
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
          : <MoonIcon className='h-10 w-10 fill-white' onClick={onSwitchTheme} />}
      </div>

      <MyButton color='black' onClick={() => { }} title='button title' variant='roundedXl' />
      <MyButton color='yellow' onClick={() => { }} title='button title' variant='roundedXl' />
      <Navbar />
    </div>
  )
}

export default Home