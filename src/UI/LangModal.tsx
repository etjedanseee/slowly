import React, { useState } from 'react'
import { ILangList } from '../types/User/user'

interface LangModalProps {
  lang: ILangList | null
}

const LangModal = ({ lang }: LangModalProps) => {
  const [langLevel, setLangLevel] = useState<number | null>(null)
  if (!lang) {
    return <div>qwe</div>
  }

  return (
    <div className='mb-10'>
      <div>
        <div>Close</div>
        <div>Add</div>
      </div>

      <div>
        <div>{lang.name}</div>
        <div>{lang.engName}</div>

        <div className='flex justify-center gap-x-2'>
          <div
            className={`
              ${langLevel !== null && langLevel <= 0 + 1 ? '' : ''} 
                rounded-full p-2 bg-zinc-800 border-2 border-white h-4 w-4
              `}
          ></div>
          <div
            className={`
              ${langLevel !== null && langLevel <= 0 + 1 ? '' : ''} 
                rounded-full p-2 bg-zinc-800 border-2 border-white h-4 w-4
              `}
          ></div>
          <div
            className={`
              ${langLevel !== null && langLevel <= 0 + 1 ? '' : ''} 
                rounded-full p-2 bg-zinc-800 border-2 border-white h-4 w-4
              `}
          ></div>
          <div
            className={`
              ${langLevel !== null && langLevel <= 0 + 1 ? '' : ''} 
                rounded-full p-2 bg-zinc-800 border-2 border-white h-4 w-4
              `}
          ></div>
          <div
            className={`
              ${langLevel !== null && langLevel <= 0 + 1 ? '' : ''} 
                rounded-full p-2 bg-zinc-800 border-2 border-white h-4 w-4
              `}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default LangModal