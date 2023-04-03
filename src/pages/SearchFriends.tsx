import React from 'react'
import Navbar from '../components/Navbar'
import MyButton from '../UI/MyButton'

const SearchFriends = () => {
  return (
    <div>
      <div>SearchFriends</div>
      <MyButton color='black' onClick={() => { }} title='autoSearch' variant='roundedXl' />
      <MyButton color='yellow' onClick={() => { }} title='manuallySearch' variant='roundedXl' />
      <Navbar />
    </div>
  )
}

export default SearchFriends