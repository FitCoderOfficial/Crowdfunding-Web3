import React from 'react'

import { loader } from '../assets';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain"/>
      <p className="mt-[20px] font-notosans font-bold text-[20px] text-white text-center">요청을 처리하고 있습니다 <br /> 잠시만 기다려주세요</p>
    </div>
  )
}

export default Loader