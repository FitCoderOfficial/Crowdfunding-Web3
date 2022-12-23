import React, { useState } from 'react'  //react hook을 사용해 함수형 컴포넌트에서 동적인 부분관리
import { Link, useNavigate  } from 'react-router-dom';
import { logo, sun } from '../assets';
import { navlinks } from '../constants';

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
    <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
      {!isActive ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" /> // 로그인이 아닐떄 
      ) : (
        <img src={imgUrl} alt="fund_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} /> //로그인일때 
      )}
    </div>
  )



const SIdebar = () => {

    const navigate = useNavigate();   //useNavigate 페이지 전환시 처리해야하는 로직이 있기 때문, 프로필
    const [isActuve, setIsActive] = useState('dashboard');


  return (
    
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
        사이드바
        <Link to='/'>
            <Icon styles="w-[52px] h-[52px] bg-[#2c2f32]" imgUrl={logo} />
        </Link>

        <div className='flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12'> 
          <div className='flex flex-col justify-center items-center gap-y-3.5 '>
            {navlinks.map((link) => (
              <Icon
              key={link.name}
              {...link}
              isActive={isActuve}
              handleClick={()=>{
                if(!link.disabled) {
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
              />
            ))}

          </div>

          <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} />
        </div>
    </div>
  )
}

export default SIdebar