export const calcWordsCount = (str: string) => {
  const separators = [' ', ',', '.', '!', '?']
  let res = 0
  const strArr = str.split('')

  let i = 0;
  while (i < strArr.length) {
    let j = i
    while (separators.indexOf(strArr[j]) === -1 && j < strArr.length) {
      j++
    }
    if (j > i) {
      res++
      i = j + 1
    } else {
      i++
    }
  }
  return res
}