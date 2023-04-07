import React, { useState, useEffect } from 'react'
import SignUpNavigation from '../UI/SignUpNavigation'
import UserInfo from '../components/UserInfo'
import Interests from '../components/Interests'
import Languages from '../components/Languages'
import UserGeo from '../components/UserGeo'
import UserEmail from '../components/UserEmail'
import { ILang, IUserGeo, IUserInfo, interest } from '../types/Auth/auth'
import ConfirmEmail from './ConfirmEmail'

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

  const onPrevStepClick = () => {
    if (formStep !== 1) {
      setFormStep(prev => prev - 1)
    }
  }

  const onNextStepClick = () => {
    if (formStep === 7) {
      console.log('successful registration')
    } else {
      setFormStep(prev => prev + 1)
    }
  }

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
          interests={interests}
          setInterests={setInterests}
          setIsInterestsValid={setIsInterestsValid}
        />
      )}
      {formStep === 3 && (
        <Languages
          languages={languages}
          setLanguages={setLanguages}
          setIsLanguagesValid={setIsLanguagesValid}
        />
      )}
      {formStep === 4 && (
        <UserGeo
          userGeo={userGeo}
          setIsUserGeoValid={setIsUserGeoValid}
          setUserGeo={setUserGeo}
        />
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
          geo={userGeo || { coord: { latitude: 0, longitude: 0 }, ip: '', location: { city: '', country: '' } }}
          info={userInfo}
          password={userPassword || ''}
        />
      )}
    </>
  )
}

export default SignUpPage