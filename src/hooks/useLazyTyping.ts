import { useState, useEffect } from 'react'

export const useLazyTyping = (text: string, delay: number) => {
  const [value, setValue] = useState('')
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
  }, [text])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (index <= text.length) {
        setValue(text.slice(0, index))
        setIndex(prev => prev + 1)
      }
    }, delay)

    return () => {
      clearTimeout(timeout)
    }
  }, [text, delay, index])

  return value
}