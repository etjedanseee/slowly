import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { useTypedSelector } from './hooks/useTypedSelector';
import Draft from './pages/Draft';
import Friends from './pages/Friends';
import Home from './pages/Home';
import SearchFriends from './pages/SearchFriends';
import Settings from './pages/Settings';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { dictionary } from './utils/consts';
import Profile from './pages/Profile';
import AuthPage from './pages/AuthPage';
import SignUpPage from './pages/SignUpPage';

//сделать редирект на авторизацию если в куках нет юзера
function App() {
  const { theme, lang } = useTypedSelector(state => state.theme)

  i18n.use(initReactI18next).init({
    resources: { en: { translation: dictionary.en }, ua: { translation: dictionary.ua } },
    lng: lang,
    fallbackLng: lang,
    interpolation: { escapeValue: false },
  });

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-slate-200 text-zinc-900'} min-h-screen`}>
      <Routes>
        <Route path='/' element={<>
          <Home />
        </>} />
        <Route path='/friends' element={<>
          <Friends />
        </>} />
        <Route path='/search' element={<>
          <SearchFriends />
        </>} />
        <Route path='/draft' element={<>
          <Draft />
        </>} />
        <Route path='/profile' element={<>
          <Profile />
        </>} />
        <Route path='/profile/settings' element={<>
          <Settings />
        </>} />
        <Route path='/auth' element={<>
          <AuthPage />
        </>} />
        <Route path='/auth/signUp' element={<>
          <SignUpPage />
        </>} />
      </Routes>
    </div>
  );
}

export default App;
