import React from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import { ReactComponent as ArrowBack } from '../assets/arrowBack.svg'
import MyButton from './MyButton'

interface NavigationProps {
  step: number,
  isStepsValid: boolean[],
  onPrevClick: () => void,
  onNextClick: () => void,
  onCloseClick: () => void,
  buttonText?: string
}

const SignUpNavigation = ({ onNextClick, onPrevClick, step, isStepsValid, onCloseClick, buttonText }: NavigationProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const isCurrentStepValid = isStepsValid[step - 1]

  return (
    <div className={`
      ${theme === 'dark' ? 'bg-black text-white' : 'bg-zinc-300 text-zinc-900'}
      flex items-center justify-between py-3 px-2 z-50 fixed top-0 nMb:left-1/2 nMb:-translate-x-1/2 nMb:max-w-[425px] w-full
    `}>
      <div>
        {step === 1
          ? (
            <CloseIcon
              className={`h-6 w-6 cursor-pointer ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
              onClick={onCloseClick}
            />
          )
          : (
            <ArrowBack
              className={`h-7 w-7 cursor-pointer ${theme === 'dark' ? 'fill-white' : 'fill-black'}`}
              onClick={onPrevClick}
            />
          )
        }
      </div>
      <div>
        {step !== 6 && (
          <MyButton
            color='yellow'
            disabled={!isCurrentStepValid}
            onClick={isCurrentStepValid ? onNextClick : () => { }}
            title={buttonText || 'next'}
            variant='rounded-full'
            p='px-8 text-lg'
          />
        )}
      </div>
    </div>
  )
}

export default SignUpNavigation