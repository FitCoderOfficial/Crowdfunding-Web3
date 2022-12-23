import React from 'react'

const CustomButton = ({ btnTyepe, title, handleClick, style}) => {
  return (
    <div>
      <button
      type={btnTyepe}
      className={`font-notosans font-semibold text-[16px] leading-[26px] text-white min-h-[52px] px-4 rounded-[10px] ${style}`}
      onClick={handleClick}
      >
        {title}
      </button>
    </div>
  )
}

export default CustomButton