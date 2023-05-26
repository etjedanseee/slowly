import React from 'react'
import Navbar from '../components/Navbar'
import MyButton from '../UI/MyButton'

const SearchFriends = () => {
  return (
    <div>
      <div>SearchFriends</div>
      <MyButton color='black' onClick={() => { }} title='autoSearch' />
      <MyButton color='yellow' onClick={() => { }} title='manuallySearch' />
      <Navbar />
    </div>
  )
}

export default SearchFriends