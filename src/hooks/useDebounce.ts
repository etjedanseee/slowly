import { useEffect, useState } from "react"


export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const debouceTimeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(debouceTimeout)
    }
  }, [value, delay])

  return debouncedValue
}