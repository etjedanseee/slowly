import React, { useState, ChangeEvent } from 'react'
import Navbar from '../components/Navbar'
import MyButton from '../UI/MyButton'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { useTranslation } from 'react-i18next'
import TextInput from '../UI/TextInput'
import { fetchUserById } from '../utils/fetchUserById'
import { IUser } from '../types/Auth/auth'
import { useNavigate } from 'react-router-dom'
import { ReactComponent as PlaneIcon } from '../assets/plane.svg'
import WriteLetter from '../components/WriteLetter'
import { useDeliveryTime } from '../hooks/useDeliveryTime'
import Loader from '../UI/Loader'

//решить проблему с отображением профиля или ошибки при лоадинге от запроса
const SearchFriends = () => {
  const { theme } = useTypedSelector(state => state.theme)
  const { user } = useTypedSelector(state => state.auth)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [otherUserId, setOtherUserId] = useState('')
  const [otherUser, setOtherUser] = useState<IUser | null>(null)
  const [otherUserLoading, setOtherUserLoading] = useState(false)
  const [isHideSearchButton, setIsHideSearchButton] = useState(false)
  const [userSearchError, setUserSearchError] = useState('')
  const [isWriteLetterVisible, setWriteLetterVisible] = useState(false)

  const { deliveredTime } = useDeliveryTime(user, otherUser)

  const handleOtherUserIdChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtherUserId(e.target.value)
    setIsHideSearchButton(false)
  }

  const onSearchOtherUser = async () => {
    setOtherUserLoading(true)
    setIsHideSearchButton(true)
    await fetchUserById(otherUserId, setOtherUser, setUserSearchError)
    setOtherUserLoading(false)
  }

  const onUserProfileClick = () => {
    navigate('/users/' + otherUserId)
  }

  const handleIsWriteLetterVisible = () => {
    setWriteLetterVisible(prev => !prev)
  }

  const goToAutoSearch = () => {
    navigate('/search/autoSearch')
  }

  const goToManuallySearch = () => {
    navigate('/search/manuallySearch')
  }

  return (
    <div className='flex flex-col justify-around h-screen text-center pb-10 px-3'>
      <div>
        <div className='text-2xl leading-none mb-2'>{t('findNewPenPals')}</div>
        <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} `}>{t('startCommunicate')} Slowly</div>
      </div>

      <div className='text-start mb-4'>
        <div className='font-medium mb-2'>{t('adddFriendById')} Slowly ID</div>
        <TextInput
          onFocus={() => { }}
          onInputChange={handleOtherUserIdChange}
          value={otherUserId}
          placeholder={`${t('enter')} Slowly ID`}
        />
        <div className='mb-2'></div>

        {!userSearchError && isHideSearchButton && (
          <>
            {otherUserLoading
              ? <div className='flex justify-center'><Loader size='12' /></div>
              : otherUser && (
                <div className='flex justify-between items-center py-3'>
                  <div
                    className='flex items-center gap-x-4'
                    onClick={onUserProfileClick}
                  >
                    <img src={otherUser.info.avatarUrl} className='rounded-full h-12 w-12' alt="other user avatar" />
                    <div>
                      <div className='font-medium'>{otherUser.info.nickName}</div>
                      <div className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} `}>{otherUser.geo.location.country}</div>
                    </div>
                  </div>
                  <div >
                    <PlaneIcon
                      className={`h-10 w-10 p-2 rounded-full fill-black bg-gray-300`}
                      onClick={handleIsWriteLetterVisible}
                    />
                  </div>
                </div>
              )
            }
          </>
        )}
        {userSearchError && isHideSearchButton && <div className='text-red-500 font-medium'>{userSearchError}</div>}
        {!isHideSearchButton && <MyButton color='black' onClick={onSearchOtherUser} title='search' />}
      </div>

      <div className='flex flex-col gap-y-2'>
        <MyButton color='black' onClick={goToAutoSearch} title='autoSearch' p='py-2' />
        <MyButton color='yellow' onClick={goToManuallySearch} title='manuallySearch' p='py-2' />
      </div>

      {isWriteLetterVisible && otherUser && (
        <WriteLetter
          deliveredTime={deliveredTime}
          otherUser={otherUser}
          onClose={handleIsWriteLetterVisible}
        />
      )}
      <Navbar />
    </div>
  )
}

export default SearchFriends