import React, { useState, useEffect } from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import Loader from '../UI/Loader'
import { useTranslation } from 'react-i18next'
import { ReactComponent as SearchFriendsIcon } from '../assets/searchFriends.svg'
import { ReactComponent as ArrowBackIcon } from '../assets/arrowBack.svg'
import { ReactComponent as ArrowDownIcon } from '../assets/arrowDown.svg'
import { useNavigate } from 'react-router-dom'
import MultySelect from '../UI/MultySelect'
import { levelLangNames, sexArr } from '../utils/consts'
import { ILang, IUser, SexType, interest } from '../types/Auth/auth'
import Select from '../UI/Select'
import MyButton from '../UI/MyButton'
import WriteTextModal from '../UI/WriteTextModal'
import { getUsersForMailing } from '../utils/getUsersForMailing'
import { sendLetter } from '../utils/sendLetter'
import { coordsToDistance } from '../utils/calcDistance'


const AutoSearch = () => {
  const { user, chatList } = useTypedSelector(state => state.auth)
  const { theme } = useTypedSelector(state => state.theme)
  const { t } = useTranslation()
  const navigate = useNavigate()

  const [isIncludeUserCountryToSearch, setIsIncludeUserCountryToSearch] = useState(true)

  const [preferenceSex, setPreferenceSex] = useState<SexType[]>(user?.profile.sexPreference || [])
  const [isPrefSexMenuVisible, setIsPrefSexMenuVisible] = useState(false)

  const [numOfRecipients, setNumOfRecipients] = useState<1 | 2 | 3>(1)
  const [selectedNumOfRecipients, setSelectedNumOfRecipients] = useState<1 | 2 | 3>(numOfRecipients)
  const [isNumOfRecipientsSelectVisible, setIsNumOfRecipientsSelectVisible] = useState(false)

  const [learningLang, setLearningLang] = useState<ILang>(user?.languages[0] || { code: 'en', engName: 'English', isSelected: false, level: 0, name: 'English' })
  const [selectedLearningLang, setSelectedLearningLang] = useState<ILang>(user?.languages[0] || { code: 'en', engName: 'English', isSelected: false, level: 0, name: 'English' })
  const [isLearningLangSelectVisible, setIsLearningLangVisible] = useState(false)

  const [langProficiency, setLangProficiency] = useState(selectedLearningLang?.level || 0)
  const [selectedLangProficiency, setSelectedLangProficiency] = useState(langProficiency)
  const [isLangProficiencySelectVisible, setIsLangProficiencyVisible] = useState(false)

  const [topic, setTopic] = useState<interest>(user?.interests.sort((a, b) => a.localeCompare(b))[0] || 'Life')
  const [selectedTopic, setSelectedTopic] = useState(topic)
  const [isTopicSelectVisible, setIsTopicSelectVisible] = useState(false)

  const [letterText, setLetterText] = useState('')
  const [isLetterTextModalVisible, setIsLetterTextModalVisible] = useState(false)

  const [usersForMailing, setUsersForMailing] = useState<IUser[]>([])

  useEffect(() => {
    setLangProficiency(selectedLearningLang?.level || 0)
    setSelectedLangProficiency(selectedLearningLang?.level || 0)
  }, [selectedLearningLang])

  const handleNumOfRecipientsSelectVisible = () => {
    setIsNumOfRecipientsSelectVisible(prev => !prev)
  }

  const onChangeNumOfRecipients = (num: 1 | 2 | 3) => {
    setNumOfRecipients(num)
  }

  const onSaveNumOfRecipients = () => {
    setSelectedNumOfRecipients(numOfRecipients)
    handleNumOfRecipientsSelectVisible()
  }

  const onCloseNumOfRecipientsSelect = () => {
    setNumOfRecipients(selectedNumOfRecipients)
    handleNumOfRecipientsSelectVisible()
  }

  const handleLearningLangSelectVisible = () => {
    setIsLearningLangVisible(prev => !prev)
  }

  const onChangeLearningLang = (langName: string) => {
    const changedLang = user?.languages.find(l => l.name === langName)
    if (changedLang) {
      setLearningLang(changedLang)
    }
  }

  const onSaveLearningLang = () => {
    setSelectedLearningLang(learningLang)
    handleLearningLangSelectVisible()
  }

  const onCloseLearningLangSelect = () => {
    setLearningLang(selectedLearningLang)
    handleLearningLangSelectVisible()
  }

  const handleLangProficiencySelectVisible = () => {
    setIsLangProficiencyVisible(prev => !prev)
  }

  const onChangeLangProficiency = (name: string) => {
    const position = levelLangNames.indexOf(name)
    if (position !== -1) {
      setLangProficiency(position)
    }
  }

  const onSaveLangProficiency = () => {
    setSelectedLangProficiency(langProficiency)
    handleLangProficiencySelectVisible()
  }

  const onCloseLangProficiencySelect = () => {
    setLangProficiency(selectedLangProficiency)
    handleLangProficiencySelectVisible()
  }

  const handleTopicSelectVisible = () => {
    setIsTopicSelectVisible(prev => !prev)
  }

  const onChangeTopic = (changedTopic: interest) => {
    setTopic(changedTopic)
  }

  const onSaveTopic = () => {
    setSelectedTopic(topic)
    handleTopicSelectVisible()
  }

  const onCloseTopicSelect = () => {
    setTopic(selectedTopic)
    handleTopicSelectVisible()
  }

  const handleLetterTextModalVisible = () => {
    setIsLetterTextModalVisible(prev => !prev)
  }

  const onSaveLetterText = (text: string) => {
    setLetterText(text)
    handleLetterTextModalVisible()
  }

  const onGoBackClick = () => {
    navigate('/search')
  }

  const onIncludeUserCountryToSearchChange = () => {
    setIsIncludeUserCountryToSearch(prev => !prev)
  }

  const handlePrefSexMenuVisible = () => {
    setIsPrefSexMenuVisible(prev => !prev)
  }

  const handlePreferenceSex = (option: SexType) => {
    if (preferenceSex.find(prefS => prefS === option)) {
      if (preferenceSex.length !== 1) {
        setPreferenceSex(preferenceSex.filter(prefS => prefS !== option))
      }
    } else {
      setPreferenceSex([...preferenceSex, option])
    }
  }

  const onSendMailingLetter = () => {
    if (user) {
      if (!letterText.trim().length) {
        return false
      }
      const letterParams = {
        userCountry: user.geo.location.country,
        // excludeIds: [user.id,...chatList.map(chat => chat.chatId)],
        excludeIds: [user.id],
        isIncludeUserCountryToSearch,
        preferenceSex,
        selectedLangProficiency,
        selectedLearningLang,
        selectedNumOfRecipients,
        selectedTopic,
        setUsersForMailing,
      }
      // console.log('send MailingLetter', letterParams)

      getUsersForMailing(letterParams)
    }
  }

  useEffect(() => {
    if (!!usersForMailing.length && user) {
      for (let receiverUser of usersForMailing) {
        const diffGeoDistance = coordsToDistance(user.geo.coord, receiverUser.geo.coord)
        const deliveredTime = Math.round(diffGeoDistance / 90)
        sendLetter(user.id, receiverUser.id, letterText, deliveredTime)
      }
      setUsersForMailing([])
    }
  }, [usersForMailing, user])

  if (!user) {
    return <div className='flex justify-center py-20'><Loader size='16' /></div>
  }

  return (
    <div className={`${theme === 'dark' ? 'text-gray-200 bg-zinc-900' : 'text-gray-900 bg-gray-200'} min-h-screen pt-16`}>
      <div className='fixed top-0 left-0 py-3 px-3 w-full z-10 bg-inherit flex items-center justify-between gap-x-6'>
        <ArrowBackIcon
          className={`h-7 w-7 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
          onClick={onGoBackClick}
        />
        <div className='text-lg font-medium flex-1'>{t('autoSearch')}</div>
      </div>

      <div className='flex justify-center items-center mb-6'>
        <SearchFriendsIcon className={`h-32 w-32 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`} />
      </div>

      <div className={`text-xs px-2 mb-1`}>{t('target')}</div>
      <div className={`py-3 px-2 mb-4 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}`}>
        <div className='flex items-center justify-between mb-3'>
          <div className='text-sm'>{t('includeMyCountryInSearch')}</div>
          <div
            className={`border-yellow-500 border-2 h-5 w-5 flex items-center justify-center`}
            onClick={onIncludeUserCountryToSearchChange}
          >
            <div className={`${isIncludeUserCountryToSearch ? 'bg-yellow-500' : 'bg-transparent'} h-3 w-3`} />
          </div>
        </div>

        <div className='flex items-center justify-between mb-3 relative'>
          <div className='text-sm'>{t('sex')}</div>

          <div>
            <MultySelect
              options={sexArr}
              isMenuVisible={isPrefSexMenuVisible}
              onSelectOption={handlePreferenceSex}
              selectedOptions={preferenceSex}
              onClose={handlePrefSexMenuVisible}
              selectTitle='sex'
            />
            <div
              onClick={handlePrefSexMenuVisible}
              className='flex items-center gap-x-1'
            >
              <div className='text-sm'>
                {preferenceSex.length === 3
                  ? t('Any')
                  : preferenceSex.length === 2
                    ? t(preferenceSex[0]) + ', ' + t(preferenceSex[1])
                    : t(preferenceSex[0])
                }
              </div>
              <ArrowDownIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
            </div>

          </div>
        </div>

        <div className='flex items-center justify-between relative'>
          <div className='text-sm'>{t('numOfRecipients')}</div>

          <div
            onClick={handleNumOfRecipientsSelectVisible}
            className='flex items-center gap-x-1'
          >
            <div>{selectedNumOfRecipients}</div>
            <ArrowDownIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
          </div>

          {isNumOfRecipientsSelectVisible && (
            <Select
              onSelectOption={onChangeNumOfRecipients}
              options={[1, 2, 3]}
              selectedOption={numOfRecipients}
              title='numOfRecipients'
              onClose={onCloseNumOfRecipientsSelect}
              onSave={onSaveNumOfRecipients}
            />
          )}
        </div>
      </div>

      <div className={`text-xs px-2 mb-1`}>{t('aboutLetter')}</div>
      <div className={`py-3 px-2 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-white'}`}>
        <div className='flex items-center justify-between mb-3'>
          <div className='text-sm'>{t('learningLangs')}</div>

          <div
            onClick={handleLearningLangSelectVisible}
            className='flex items-center gap-x-1'
          >
            <div className='text-sm'>{selectedLearningLang?.name}</div>
            <ArrowDownIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
          </div>

          {isLearningLangSelectVisible && (
            <Select
              onSelectOption={onChangeLearningLang}
              options={user.languages.map(l => l.name)}
              onClose={onCloseLearningLangSelect}
              onSave={onSaveLearningLang}
              selectedOption={learningLang?.name}
              title='aboutLetter'
            />
          )}
        </div>

        <div className='flex items-center justify-between mb-3'>
          <div className='text-sm'>{t('Language Proficiency')}</div>

          <div
            onClick={handleLangProficiencySelectVisible}
            className='flex items-center gap-x-1'
          >
            <div className='text-sm'>{t(levelLangNames[selectedLangProficiency])}</div>
            <ArrowDownIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
          </div>

          {isLangProficiencySelectVisible && (
            <Select
              onSelectOption={onChangeLangProficiency}
              options={levelLangNames}
              onClose={onCloseLangProficiencySelect}
              onSave={onSaveLangProficiency}
              selectedOption={levelLangNames[langProficiency]}
              title='Language Proficiency'
            />
          )}
        </div>

        <div className='flex items-center justify-between mb-4'>
          <div className='text-sm'>{t('topic')}</div>

          <div
            onClick={handleTopicSelectVisible}
            className='flex items-center gap-x-1'
          >
            <div className='text-sm'>{t(selectedTopic || '')}</div>
            <ArrowDownIcon className={`h-5 w-5 ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-900'}`} />
          </div>

          {isTopicSelectVisible && (
            <Select
              onSelectOption={onChangeTopic}
              options={user.interests}
              onClose={onCloseTopicSelect}
              onSave={onSaveTopic}
              selectedOption={topic}
              title='topic'
            />
          )}
        </div>

        <div className='min-h-[150px] flex flex-col justify-between'>
          <div>
            <div className='mb-1'>{t('letterText')}</div>
            <div className='text-sm'>{letterText.slice(0, 100)}</div>
          </div>

          <MyButton
            color='black'
            onClick={handleLetterTextModalVisible}
            title='write'
            variant='rounded-lg'
            p='py-2'
          />

          {isLetterTextModalVisible && (
            <WriteTextModal
              defaultText={letterText}
              onClose={handleLetterTextModalVisible}
              onSave={onSaveLetterText}
            />
          )}
        </div>
      </div>

      <div className='py-5 px-3'>
        <MyButton
          color='yellow'
          onClick={onSendMailingLetter}
          title='send'
          variant='rounded-lg'
          p='py-2'
        />
      </div>

    </div>
  )
}

export default AutoSearch