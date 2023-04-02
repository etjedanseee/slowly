import React from 'react';
import { Routes, Route } from 'react-router-dom'
import { useTypedSelector } from './hooks/useTypedSelector';
import Draft from './pages/Draft';
import Friends from './pages/Friends';
import Home from './pages/Home';
import MenuPage from './pages/MenuPage';
import SearchFriends from './pages/SearchFriends';
import Settings from './pages/Settings';

function App() {
  const { theme } = useTypedSelector(state => state.theme)
  return (
    <div className={`${theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-slate-200 text-black'} min-h-screen`}>
      <Routes>
        <Route path='/' element={<>
          <Home />
        </>} />
        <Route path='/letters' element={<>
          <Friends />
        </>} />
        <Route path='/search' element={<>
          <SearchFriends />
        </>} />
        <Route path='/draft' element={<>
          <Draft />
        </>} />
        <Route path='/menu' element={<>
          <MenuPage />
        </>} />
        <Route path='/menu/settings' element={<>
          <Settings />
        </>} />
      </Routes>
    </div>
  );
}

export default App;
