import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import { useTypedSelector } from './hooks/useTypedSelector';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { dictionary } from './utils/dictionary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundPage from './pages/NotFoundPage';
import supabase from './supabaseClient';
import { getPropertiesForUserFromSbUser } from './utils/getPropertiesForUserFromSbUser';
import Loader from './UI/Loader';
import { useActions } from './hooks/useActions';
import { privateRoutes, publicRoutes } from './utils/routes';

function App() {
  const { theme, lang } = useTypedSelector(state => state.theme)
  const { user, chatList } = useTypedSelector(state => state.auth)
  const { interests } = useTypedSelector(state => state.data)
  const { setUser, fetchInterests, fetchUserChatList, fetchFriends, changeLanguage, changeTheme } = useActions()

  const [isCheckingSession, setIsCheckingSession] = useState(true)
  const [toastXPosition, setToastXPosition] = useState({ left: '0', width: '0', transform: 'translateX(0)' })

  const updateToastXPosition = () => {
    const body = document.body;
    if (body) {
      const bodyWidth = body.offsetWidth
      const position = (window.innerWidth - bodyWidth) / 2
      setToastXPosition({ left: `${position}px`, width: bodyWidth + 'px', transform: 'translateX(0)' });
    }
  };

  useEffect(() => {
    updateToastXPosition();
    window.addEventListener('resize', updateToastXPosition);
    return () => {
      window.removeEventListener('resize', updateToastXPosition);
    };
  }, [])

  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: dictionary.en },
      ua: { translation: dictionary.ua }
    },
    lng: lang,
    fallbackLng: lang,
    interpolation: { escapeValue: false },
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession()
        if (data.session) {
          const userObj = getPropertiesForUserFromSbUser(data.session.user)
          setUser(userObj)
          changeLanguage(userObj.settings.appLang)
          changeTheme(userObj.settings.theme)
        }
        if (error) {
          throw new Error(error.message)
        }
      } catch (e) {
        console.log('get session error', e)
      } finally {
        setIsCheckingSession(false)
      }
    }
    checkSession()
  }, [])

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

  if (isCheckingSession) {
    return (
      <div className='h-screen flex justify-center items-center bg-zinc-800'>
        <Loader size='20' />
      </div>
    )
  }

  return (
    <div className={`flex-1 flex flex-col relative
      ${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-slate-200 text-zinc-900'} 
    `}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={toastXPosition}
      />

      <Routes>
        {user
          ? (
            <>
              {
                privateRoutes.map(route => (
                  <Route  {...route} key={route.path} />
                ))
              }
            </>
          )
          : (
            <>
              {
                publicRoutes.map(route => (
                  <Route  {...route} key={route.path} />
                ))
              }
            </>
          )}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
