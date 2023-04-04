

export const dictionary = {
  en: {
    autoSearch: 'Auto search',
    manuallySearch: 'Manually search',
    letterOnTheWay: 'Letter on the way',
    changeLang: 'Change language to english',
    appLang: 'Application language',
    penpals: 'Penpals',
    friends: 'Friends',
    helloWorld: 'Share your interests with the world',
    letsStart: 'Let\'s start',
    alredyHaveAcc: 'Already have an account? Login',
    next: 'Next',
    sex: 'Sex',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    birthday: 'Birthday',
    enterDate: 'Please enter the correct date',
    nickName: 'Nickname',
    required: 'Field is required'
  },
  ua: {
    autoSearch: 'Автопошук',
    manuallySearch: 'Шукати вручну',
    letterOnTheWay: 'Лист у дорозі',
    changeLang: 'Змінити мову на українську',
    appLang: 'Мова програми',
    penpals: 'Дружки по листуванню',
    friends: 'Друзі',
    helloWorld: 'Поділіться своїми інтересами зі світом',
    letsStart: 'Давайте почнемо',
    alredyHaveAcc: 'Вже є акаунт? Увійти',
    next: 'Далі',
    sex: 'Стать',
    male: 'Чоловічий',
    female: 'Жіноча',
    other: 'Інший',
    birthday: 'День народження',
    enterDate: 'Будь ласка, введіть правильну дату',
    nickName: 'Псевдонім',
    required: 'Поле обов\'язкове'
  }
}

export const regexStringDate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/