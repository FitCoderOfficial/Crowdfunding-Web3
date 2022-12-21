import React from 'react';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className='relateve sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row'>
        <h2 className='font-epilogue'>TEST TTT</h2>
        <h1>모든 인류 구성원의 천부의 존엄성과 동등하고 양도할 수 없는 권리를 인정하는 side bar TEST</h1>
      <div className='sm:flex hidden mr-10 relative'>
      사이드바 Side bar
      </div>

      <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
      네비게이션바

      </div>
    </div>
  )
}

export default App