import React from 'react'

interface CheckBoxProps {
  cheked: boolean
}

const CheckBox = ({ cheked }: CheckBoxProps) => {

  return (
    <div>
      <div className={`${cheked ? 'bg-yellow-500' : ' border-white'} p-2 border-2`} />
    </div>
  )
}

export default CheckBox