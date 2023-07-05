

export const calcAge = (date: Date): number => {
  const now = Date.now()
  const dateMs = +date

  const diff = now - dateMs
  const res = new Date(diff)

  return res.getFullYear() - 1970
}

export const ageToString = (date: string): string => {
  const d = new Date(date)
  const monthNum = d.getMonth() + 1
  const dayNum = d.getDate()

  return `${dayNum < 10 ? `0${dayNum}` : dayNum} / ${monthNum < 10 ? `0${monthNum}` : monthNum} (${calcAge(d)})`
}