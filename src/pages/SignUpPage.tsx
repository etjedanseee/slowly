import React, { useState, useEffect } from 'react'
import SignUpNavigation from '../UI/SignUpNavigation'
import UserInfo from '../components/UserInfo'
import Interests from '../components/Interests'
import UserGeo from '../components/UserGeo'
import UserEmail from '../components/UserEmail'
import { ILang, ISignUpData, IUserGeo, IUserInfo, interest } from '../types/Auth/auth'
import ConfirmEmail from './ConfirmEmail'
import UserLangs from '../components/UserLangs'
import { useNavigate } from 'react-router-dom'

const SignUpPage = () => {
  const [formStep, setFormStep] = useState(1)

  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null)
  const [isUserInfoValid, setIsUserInfoValid] = useState(false)

  const [interests, setInterests] = useState<interest[]>([])
  const [isInterestsValid, setIsInterestsValid] = useState(false)

  const [languages, setLanguages] = useState<ILang[]>([])
  const [isLanguagesValid, setIsLanguagesValid] = useState(false)

  const [userGeo, setUserGeo] = useState<IUserGeo | null>(null)
  const [isUserGeoValid, setIsUserGeoValid] = useState(false)

  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [isUserEmailValid, setIsUserEmailValid] = useState(false)

  const [userPassword, setUserPassword] = useState<string | null>(null)

  const [isFormValid, setIsFormValid] = useState(false)

  const navigate = useNavigate()

  const onPrevStepClick = () => {
    if (formStep !== 1) {
      setFormStep(prev => prev - 1)
    }
  }

  const onNextStepClick = () => {
    if (formStep < 6) {
      const signUpData: ISignUpData = {
        formStep: formStep + 1,
        userInfo,
        interests,
        languages,
        userEmail,
        userGeo,
        userPassword
      }
      localStorage.setItem('signUpData', JSON.stringify(signUpData))
      setFormStep(prev => prev + 1)
    }
  }

  const onCloseClick = () => {
    navigate('/auth', { replace: true })
  }

  useEffect(() => {
    const signUpData = localStorage.getItem('signUpData')
    if (signUpData) {
      const data: ISignUpData = JSON.parse(signUpData)
      setFormStep(data.formStep)
      if (data.userInfo) {
        setUserInfo(data.userInfo)
        setIsUserInfoValid(true)
      }
      if (data.interests.length) {
        setInterests(data.interests)
        setIsInterestsValid(true)
      }
      if (data.languages.length) {
        setLanguages(data.languages)
        setIsLanguagesValid(true)
      }
      if (data.userGeo) {
        setUserGeo(data.userGeo)
        setIsUserGeoValid(true)
      }
      if (data.userEmail) {
        setUserEmail(data.userEmail)
        setIsUserEmailValid(true)
      }
      setUserPassword(data.userPassword)
    }
  }, [])

  useEffect(() => {
    if (languages.length) {
      setIsLanguagesValid(true)
    } else {
      setIsLanguagesValid(false)
    }
  }, [languages.length])

  useEffect(() => {
    if (isUserInfoValid && isInterestsValid && isLanguagesValid && isUserGeoValid && isUserEmailValid) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }, [isUserInfoValid, isInterestsValid, isLanguagesValid, isUserGeoValid, isUserEmailValid])

  return (
    <>
      <SignUpNavigation
        onPrevClick={onPrevStepClick}
        onNextClick={onNextStepClick}
        onCloseClick={onCloseClick}
        step={formStep}
        isStepsValid={[isUserInfoValid, isInterestsValid, isLanguagesValid, isUserGeoValid, isUserEmailValid]}
      />
      {formStep === 1 && (
        <UserInfo
          setUserInfo={setUserInfo}
          userInfo={userInfo}
          setIsUserInfoValid={setIsUserInfoValid}
        />
      )}
      {formStep === 2 && (
        <Interests
          userInterests={interests}
          setInterests={setInterests}
          setIsInterestsValid={setIsInterestsValid}
        />
      )}
      {formStep === 3 && (
        <div className='py-20 relative px-4'>
          <UserLangs
            userLangs={languages}
            setUserLangs={setLanguages}
            isShowAnotherLanguages={true}
          />
        </div>
      )}
      {formStep === 4 && (
        <UserGeo
          userGeo={userGeo}
          setIsUserGeoValid={setIsUserGeoValid}
          setUserGeo={setUserGeo}
        />
      )}
      {formStep === 5 && (
        <UserEmail
          userEmail={userEmail}
          setUserEmail={setUserEmail}
          setIsUserEmailValid={setIsUserEmailValid}
          setUserPassword={setUserPassword}
          userPassword={userPassword}
        />
      )}
      {formStep === 6 && (
        <ConfirmEmail
          interests={interests}
          isFormValid={isFormValid}
          languages={languages}
          email={userEmail || ''}
          geo={userGeo || { coord: { latitude: 0, longitude: 0 }, location: { city: '', country: '' } }}
          info={userInfo}
          password={userPassword || ''}
        />
      )}
    </>
  )
}

export default SignUpPage