import React, { useState, useEffect } from 'react'
import Step1 from '../components/Step1'
import Step2 from '../components/Step2'
import Step3 from '../components/Step3'
import { IStep1Data } from '../types/Auth/sighUp'
import { ILang, interest } from '../types/User/user'
import SignUpNavigation from '../UI/SignUpNavigation'

//наверно лучше сделать тут валидность каждой из форм и одну за все, и передавать в степы сетВалид
const SignUpPage = () => {
  const [formStep, setFormStep] = useState(1)

  const [step1Data, setStep1Data] = useState<IStep1Data | null>(null)
  const [isStep1Valid, setIsStep1Valid] = useState(false)

  const [step2Data, setStep2Data] = useState<interest[]>([])
  const [isStep2Valid, setIsStep2Valid] = useState(false)

  const [step3Data, setStep3Data] = useState<ILang[]>([])
  const [isStep3Valid, setIsStep3Valid] = useState(false)

  const [isFormValid, setIsFormValid] = useState(false)

  // const [interests, setInterests] = useState<interest[]>([])
  // const [languages, setLanguages] = useState<ILang[]>([])

  const onPrevStepClick = () => {
    if (formStep === 1) {
    } else {
      setFormStep(prev => prev - 1)
    }
  }

  const onNextStepClick = () => {
    if (formStep === 4) {
      console.log('successful registration')
    } else {
      setFormStep(prev => prev + 1)
    }
  }

  useEffect(() => {
    if (step1Data !== null) {
      setIsStep1Valid(true)
    } else {
      setIsStep1Valid(false)
    }
  }, [step1Data])

  useEffect(() => {
    if (isStep1Valid && isStep2Valid) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }, [isStep1Valid, isStep2Valid, isStep3Valid])

  return (
    <>
      <SignUpNavigation
        onPrevClick={onPrevStepClick}
        onNextClick={onNextStepClick}
        step={formStep}
        isStepsValid={[isStep1Valid, isStep2Valid, isStep3Valid]}
      />
      {formStep === 1 && (
        <Step1 setStepData={setStep1Data} step1Data={step1Data} />
      )}
      {formStep === 2 && (
        <Step2
          step2Data={step2Data}
          setStepData={setStep2Data}
          setIsStep2Valid={setIsStep2Valid}
        />
      )}
      {formStep === 3 && (
        <Step3
          step3Data={step3Data}
          setIsStep3Valid={setIsStep3Valid}
          setStepData={setStep3Data}
        />
      )}
    </>
  )
}

export default SignUpPage