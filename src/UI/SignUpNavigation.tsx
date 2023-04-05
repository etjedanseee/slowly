import React from 'react'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { ReactComponent as CloseIcon } from '../assets/close.svg'
import { ReactComponent as ArrowBack } from '../assets/arrowBack.svg'
import MyButton from './MyButton'
import { useNavigate } from 'react-router-dom'

interface NavigationProps {
  step: number,
  isStepsValid: boolean[],
  onPrevClick: () => void,
  onNextClick: () => void
}

const SignUpNavigation = ({ onNextClick, onPrevClick, step, isStepsValid }: NavigationProps) => {
  const { theme } = useTypedSelector(state => state.theme)
  const navigate = useNavigate()
  const isCurrentStepValid = isStepsValid[step - 1]

  return (
    <div className={`
    ${theme === 'dark' ? 'bg-black text-white' : 'bg-zinc-300 text-zinc-900'}
    flex items-center justify-between py-3 px-2 
    `}>
      <div>
        {step === 1
          ? <CloseIcon className={`h-6 w-6 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`} onClick={() => navigate('/auth')} />
          : <ArrowBack className={`h-7 w-7 ${theme === 'dark' ? 'fill-white' : 'fill-black'}`} onClick={onPrevClick} />
        }
      </div>
      <div>
        <MyButton
          color='yellow'
          disabled={!isCurrentStepValid}
          onClick={isCurrentStepValid ? onNextClick : () => { }}
          title='next'
          variant='roundedFull'
        />
      </div>
    </div>
  )
}

export default SignUpNavigation