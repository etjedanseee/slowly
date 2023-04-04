import React, { useState } from 'react'
import Step1 from '../components/Step1'
import { ILang, interest, SexType } from '../types/User/user'
import SignUpNavigation from '../UI/SignUpNavigation'

//нужно запрещать идти на след шаг если форма не валидна
const SignUpPage = () => {
  const [formStep, setFormStep] = useState(1)

  const [sex, setSex] = useState<SexType>('male')
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [nickName, setNickName] = useState('')
  const [interests, setInterests] = useState<interest[]>([])
  const [languages, setLanguages] = useState<ILang[]>([])

  const onPrevStepClick = () => {
    if (formStep === 1) {
    } else {
      setFormStep(prev => prev - 1)
    }
  }

  const onNextStepClick = () => {
    if (formStep === 10) {
    } else {
      setFormStep(prev => prev + 1)
    }
  }

  console.log('step', formStep);

  return (
    <>
      <SignUpNavigation
        onPrevClick={onPrevStepClick}
        onNextClick={onNextStepClick}
        step={formStep}
      />
      {formStep === 1 && (
        <Step1 />
      )}
      {formStep === 2 && (
        <div>
          Step 2
        </div>
      )}
      {formStep === 3 && (
        <div>
          Step 3
        </div>
      )}
    </>
  )
}

export default SignUpPage