import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'
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
import SignInPage from './pages/SignInPage';
import { useActions } from './hooks/useActions';
import OtherProfile from './pages/OtherProfile';
import FriendChatPage from './pages/FriendChatPage';
import AutoSearch from './pages/AutoSearch';
import ManuallySearch from './pages/ManuallySearch';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const { theme, lang } = useTypedSelector(state => state.theme)
  const { user, chatList } = useTypedSelector(state => state.auth)
  const { interests } = useTypedSelector(state => state.data)
  const { setUser, fetchInterests, fetchUserChatList, fetchFriends } = useActions()

  i18n.use(initReactI18next).init({
    resources: { en: { translation: dictionary.en }, ua: { translation: dictionary.ua } },
    lng: lang,
    fallbackLng: lang,
    interpolation: { escapeValue: false },
  });

  useEffect(() => {
    const localUser = localStorage.getItem('user')
    if (localUser && !user) {
      setUser(JSON.parse(localUser))
    } else if (user && !localUser) {
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [user, setUser])

  useEffect(() => {
    if (!interests.length) {
      fetchInterests()
    }
  }, [])

  useEffect(() => {
    if (user && !chatList.length) {
      fetchUserChatList(user.id, () => { })
    }
  }, [user, chatList])

  useEffect(() => {
    if (!!chatList.length) {
      const ids = chatList.map(chat => chat.chatId)
      fetchFriends(ids)
    }
  }, [chatList])

  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-slate-200 text-zinc-900'} max-w-[500px] mx-auto min-h-screen`}>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Routes>
        {user && (
          <>
            <Route path='/' element={<Home />} />
            <Route path='/friends' element={<Friends />} />
            <Route path='/friends/:id' element={<FriendChatPage />} />
            <Route path='/search' element={<SearchFriends />} />
            <Route path='/search/autoSearch' element={<AutoSearch />} />
            <Route path='/search/manuallySearch' element={<ManuallySearch />} />
            <Route path='/draft' element={<Draft />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/profile/settings' element={<Settings />} />
            <Route path='/users/:id' element={<OtherProfile />} />
          </>
        )}
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/auth/signUp' element={<SignUpPage />} />
        <Route path='/auth/signIn' element={<SignInPage />} />
        {!localStorage.getItem('user') && <Route path='*' element={<Navigate to='/auth' />} />}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
