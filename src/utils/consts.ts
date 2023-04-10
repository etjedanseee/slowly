import { ILang, SexType, interest } from "../types/Auth/auth"


export const dictionary = {
  en: {
    autoSearch: 'Auto-match',
    manuallySearch: 'Explore manually',
    letterOnTheWay: 'Letter on the way',
    changeLang: 'Change language to english',
    appLang: 'Application language',
    penpals: 'Penpals',
    friends: 'Friends',
    helloWorld: 'Share your interests with the world!',
    letsStart: 'Let\'s start',
    alredyHaveAcc: 'Already have an account? Login',
    next: 'Next',
    sex: 'Sex',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    birthday: 'Birthday',
    enterDate: 'Please enter the correct date (YYYY-MM-DD)',
    nickName: 'Nickname',
    required: 'Field is required',
    selectInterests: 'Select topics that interest you.',
    interestsHelp: 'They will help you to find friends with common interests.',
    'Language learning': 'Language learning',
    'Movies': 'Movies',
    'Pets': 'Pets',
    'Nature': 'Nature',
    'Adventure': 'Adventure',
    'Business': 'Business',
    'Climate': 'Climate',
    'Writing': 'Writing',
    'Beauty': 'Beauty',
    'Makeup': 'Makeup',
    'Fitness': 'Fitness',
    'Cosplay': 'Cosplay',
    'Dancing': 'Dancing',
    'Languages': 'Languages',
    'You can add more than one': 'You can add more than one',
    add: 'Add',
    'Language Proficiency': 'Language Proficiency',
    Interested: 'Interested',
    Beginning: 'Beginning',
    Average: 'Average',
    Advanced: 'Advanced',
    Fluency: 'Fluency',
    'Native language': 'Native language',
    updateProficiency: 'Update your language proficiency',
    deleteLang: 'Delete language',
    cancel: 'Cancel',
    'Where are you?': 'Where are you?',
    deliveryTimeDepens: 'Delivery time for letters depends on where you and your friend live.',
    determineGeo: 'Determine by geolocation',
    determineIp: 'Determine by IP-address',
    condolences: 'My condolences, you are from',
    hello: 'Hello',
    helloUkraine: 'Good evening, you are from Ukraine!',
    email: 'Email',
    enterCorrectEmail: 'Enter correct email',
    enterCorrectPassword: 'Password must be longer than 6 characters',
    password: 'Password',
    successfulSignUp: 'Registration completed successfully!',
    confirmEmail: 'Confirm email and sign in',
    gotoLogin: 'Go to login page',
    welcome: 'Welcome!',
    signIn: 'Sign In',
    aboutMe: 'About me',
    aries: 'Aries',
    taurus: 'Taurus',
    gemini: 'Gemini',
    cancer: 'Cancer',
    leo: 'Leo',
    virgo: 'Virgo',
    libra: 'Libra',
    scorpio: 'Scorpio',
    sagittarius: 'Sagittarius',
    capricorn: 'Capricorn',
    aquarius: 'Aquarius',
    pisces: 'Pisces',
    writeBio: 'Write a biography',
    profilePreview: 'Profile preview',
    emailPreferences: 'Email Preferences',
    letterLength: 'Letter length',
    any: 'Any',
    short: 'Short',
    shortMedium: 'Short-medium',
    medium: 'Medium',
    mediumLong: 'Medium-long',
    long: 'Long',
    responseTime: 'Response time',
    soonPossible: 'As soon as possible',
    withinWeek: 'Within a week',
    within2Week: 'Within a 2 week',
    within3Week: 'Within a 3 week',
    withinMonth: 'Within a month',
    overMonth: 'Over a month',
    preferences: 'Preferences',
    selectGender: 'Select gender',
    interests: 'Interests',
    close: 'Close',
    'Career': 'Career',
    'Cars': 'Cars',
    'Casual': 'Casual',
    'Coding': 'Coding',
    'Cooking': 'Cooking',
    'Environment': 'Environment',
    'Food': 'Food',
    'Future': 'Future',
    'Gaming': 'Gaming',
    'Humor': 'Humor',
    'Ideas': 'Ideas',
    'Language': 'Language',
    'Life': 'Life',
    'Music': 'Music',
    'Politics': 'Politics',
    'Relationships': 'Relationships',
    'Sex': 'Sex',
    'Sports': 'Sports',
    'Startup': 'Startup',
    'Technology': 'Technology',
    'Travel': 'Travel',
    'Handcraft': 'Handcraft',
    'Singing': 'Singing',
    'Architecture': 'Architecture',
    'Television': 'Television',
    'Photography': 'Photography',
    'Fiction': 'Fiction',
    'Reading': 'Reading',
    'Investing': 'Investing',
    'Economics': 'Economics',
    'Finance': 'Finance',
    'Space': 'Space',
    'New Age': 'New Age',
    'Culture': 'Culture',
    'Art': 'Art',
    'Feminism': 'Feminism',
    'Religion': 'Religion',
    'Psychology': 'Psychology',
    'Health': 'Health',
    'Depression': 'Depression',
    'History': 'History',
    'Education': 'Education',
    'School Life': 'School Life',
    'Science': 'Science',
    'Family': 'Family',
    'Parenting': 'Parenting',
    'Poetry': 'Poetry',
    'Vegan': 'Vegan',
    'Anime': 'Anime',
    'Philosophy': 'Philosophy',
    'Magic': 'Magic',
    'Storytelling': 'Storytelling',
    'News': 'News',
    'Law': 'Law',
    'Sustainability': 'Sustainability',
    'Sci-Fi': 'Sci-Fi',
    'Deaf': 'Deaf',
    'Fantasy': 'Fantasy',
    'DIY': 'DIY',
    'Board Games': 'Board Games',
    'Illustration': 'Illustration',
    'Archeology': 'Archeology',
    'Theatre': 'Theatre',
    'Wine': 'Wine',
    'Farming': 'Farming',
    'Theme Parks': 'Theme Parks',
    'Disabilities': 'Disabilities',
    'Martial Arts': 'Martial Arts',
    'Museums': 'Museums',
    'Aviation': 'Aviation',
    'Astrology': 'Astrology',
    'Collecting': 'Collecting',
    'Design': 'Design',
    'Fashion': 'Fashion',
    'Gardening': 'Gardening',
    'Shopping': 'Shopping',
    'langs': 'Langs',
    showAll: 'Show all',
    hide: 'Hide',
  },
  ua: {
    hide: 'Сховати',
    showAll: 'Показати усі',
    'langs': 'Мови',
    'Television': 'Телебачення',
    'Shopping': 'Шопінг',
    'Gardening': 'Садівництво',
    'Fashion': 'Мода',
    'Design': 'Дизайн',
    'Collecting': 'Колекціонування',
    'Aviation': 'Авіація',
    'Astrology': 'Астрологія',
    'Museums': 'Музеї',
    'Martial Arts': 'Бойові мистецтва',
    'Disabilities': 'Інваліди',
    'Theme Parks': 'Тематичні парки',
    'Farming': 'Сільське господарство',
    'Wine': 'Вино',
    'Theatre': 'Театр',
    'Archeology': 'Археологія',
    'Illustration': 'Ілюстрація',
    'Board Games': 'Настільні ігри',
    'DIY': 'Ручна робота',
    'Fantasy': 'Фантазія',
    'Deaf': 'Глухий',
    'Sci-Fi': 'Наукова фантастика',
    'Sustainability': 'Стійкість',
    'Law': 'Закон',
    'News': 'Новини',
    'Storytelling': 'Розповідь',
    'Magic': 'Магія',
    'Philosophy': 'Філософія',
    'Anime': 'Аніме',
    'Vegan': 'Веган',
    'Poetry': 'Поезія',
    'Parenting': 'Виховання дітей',
    'Family': 'Сім\'я',
    'Science': 'Наука',
    'School Life': 'Шкільне життя',
    'Education': 'Освіта',
    'History': 'Історія',
    'Depression': 'Депресія',
    'Health': 'Здоров\'я',
    'Psychology': 'Психологія',
    'Religion': 'Релігія',
    'Feminism': 'Фемінізм',
    'Art': 'Мистецтво',
    'Culture': 'Культура',
    'New Age': 'Нове століття',
    'Space': 'Простір',
    'Finance': 'Фінанси',
    'Economics': 'Економіка',
    'Investing': 'Інвестування',
    'Reading': 'Читання',
    'Fiction': 'Художня література',
    'Photography': 'Фотографування',
    'Architecture': 'Архітектура',
    'Singing': 'Спів',
    'Handcraft': 'Ручна робота',
    'Travel': 'Подорожі',
    'Technology': 'Технології',
    'Startup': 'Стартап',
    'Sports': 'Спорт',
    'Sex': 'Секс',
    'Relationships': 'Стосунки',
    'Life': 'Життя',
    'Politics': 'Політика',
    'Music': 'Музика',
    'Casual': 'Випадковий',
    'Language': 'Мова',
    'Ideas': 'Ідеї',
    'Future': 'Майбутнє',
    'Humor': 'Гумор',
    'Food': 'Харчування',
    'Gaming': 'Ігри',
    'Cars': 'Автомобілі',
    'Coding': 'Кодування',
    'Environment': 'Навколишнє середовище',
    'Cooking': 'Кулінарія',
    autoSearch: 'Автопошук',
    manuallySearch: 'Шукати вручну',
    letterOnTheWay: 'Лист у дорозі',
    changeLang: 'Змінити мову на українську',
    appLang: 'Мова програми',
    penpals: 'Друзі по листуванню',
    friends: 'Друзі',
    helloWorld: 'Поділіться своїми інтересами зі світом!',
    letsStart: 'Давайте почнемо',
    alredyHaveAcc: 'Вже є акаунт? Увійти',
    next: 'Далі',
    sex: 'Стать',
    male: 'Чоловіча',
    female: 'Жіноча',
    other: 'Інша',
    birthday: 'День народження',
    enterDate: 'Будь ласка, введіть правильну дату (YYYY-MM-DD)',
    nickName: 'Псевдонім',
    required: 'Поле обов\'язкове',
    selectInterests: 'Виберіть теми, які вас цікавлять.',
    interestsHelp: 'Вони допоможуть знайти друзів зі спільними інтересами.',
    'Language learning': 'Вивчення мови',
    'Movies': 'Фільми',
    'Pets': 'Домашні тварини',
    'Nature': 'Природа',
    'Adventure': 'Пригоди',
    'Career': 'Кар\'єра',
    'Business': 'Бізнес',
    'Climate': 'Клімат',
    'Writing': "Написання",
    'Beauty': 'Краса',
    'Makeup': 'Макіяж',
    'Fitness': "Фітнес",
    'Cosplay': "Косплей",
    'Dancing': "Танці",
    'Languages': "Мови",
    'You can add more than one': 'Ви можете додати більше однієї',
    add: 'Додати',
    'Language Proficiency': 'Рівень володіння мовою',
    Interested: 'Цікавить',
    Beginning: 'Початківець',
    Average: 'Середній',
    Advanced: 'Вище середнього',
    Fluency: 'Вільне володіння',
    'Native language': 'Рідна мова',
    updateProficiency: 'Оновити рівень володіння мовою',
    deleteLang: 'Видалити мову',
    cancel: 'Відміна',
    'Where are you?': 'Звідки ви?',
    deliveryTimeDepens: 'Час доставки листів залежить від того, де ви та ваш друг мешкаєте.',
    determineGeo: 'Визначити по геолокації',
    determineIp: 'Визначити по IP-адресі',
    condolences: 'Співчуваю, ви з',
    hello: 'Hello',
    helloUkraine: 'Доброго вечора, ви з України!',
    email: 'Електронна пошта',
    enterCorrectEmail: 'Введіть коректну пошту',
    enterCorrectPassword: 'Пароль повинен бути довшим за 6 символів',
    password: 'Пароль',
    successfulSignUp: 'Реєстрація пройшла успішно!',
    confirmEmail: 'Підтвердіть пошту та увійдіть',
    gotoLogin: 'Перейти на сторінку входу',
    welcome: 'Ласкаво просимо!',
    signIn: 'Увійти',
    aboutMe: 'Про мене',
    aries: 'Овен',
    taurus: 'Телець',
    gemini: 'Близнюки',
    cancer: 'Рак',
    leo: 'Лев',
    virgo: 'Діва',
    libra: 'Терези',
    scorpio: 'Скорпіон',
    sagittarius: 'Стрілець',
    capricorn: 'Козоріг',
    aquarius: 'Водолій',
    pisces: 'Риби',
    writeBio: 'Написати біографію',
    profilePreview: 'Перегляд профілю',
    emailPreferences: 'Уподобання для листів',
    letterLength: 'Довжина листів',
    any: 'Будь-які',
    short: 'Короткі',
    shortMedium: 'Короткі-середні',
    medium: 'Середні',
    mediumLong: 'Середні-довгі',
    long: 'Довгі',
    responseTime: 'Час відповіді',
    soonPossible: 'Якомога швидше',
    withinWeek: 'Протягом тижня',
    within2Week: 'Протягом 2 тижнів',
    within3Week: 'Протягом 3 тижнів',
    withinMonth: 'Напротязі місяця',
    overMonth: 'Більше місяця',
    preferences: 'Вподобання',
    selectGender: 'Вибрати стать',
    interests: 'Інтереси',
    close: 'Закрити',
  }
}

export type langType = 'en' | 'ua' | 'de' | 'es' | 'it' | 'fr'

export const writingLangs: ILang[] = [
  { name: 'English', engName: 'English', isSelected: false, level: 0, code: 'en' },
  { name: 'Українська', engName: 'Ukrainian', isSelected: false, level: 0, code: 'ua' },
  { name: 'Français', engName: 'French', isSelected: false, level: 0, code: 'fr' },
  { name: 'Deutsch', engName: 'German', isSelected: false, level: 0, code: 'de' },
  { name: 'Italiano', engName: 'Italian', isSelected: false, level: 0, code: 'it' },
  { name: 'Español', engName: 'Spanish', isSelected: false, level: 0, code: 'es' },
]

export const letterLengths = ['any', 'short', 'shortMedium', 'medium', 'mediumLong', 'long']
export const responseTimeArr = ['soonPossible', 'withinWeek', 'within2Week', 'within3Week', 'withinMonth', 'overMonth']
export const sexArr: SexType[] = ['male', 'female', "other"]