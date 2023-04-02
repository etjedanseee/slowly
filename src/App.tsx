import React from 'react';
import MyButton from './UI/MyButton';

function App() {
  return (
    <div className="p-4">
      <MyButton color='black' onClick={() => { }} title='button title' variant='roundedFull' />
      <MyButton color='yellow' onClick={() => { }} title='button title' variant='roundedXl' />
    </div>
  );
}

export default App;
