import React,{ useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { ethers } from 'ethers';

import { money } from '../assets';
import { CustomButton, FormField } from '../components';
import { checkIfImage } from '../utils';


 
const CreateCampaign = () => {

  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [form, setform] = useState({
    name: '',
    title: '',
    description: '',
    target: '',
    deadline: '',
    image: '',
  });

  const handleSubmit = () => {

  }

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && 'Loader...'}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-notosans font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>프로젝트 시작하기</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">  
        <div className='flex flex-wrap gap-[40px]'>
          <FormField 
          labelName="이름"
          placeholder="홍길동" 
          inputType="text"
          value={form.name}
          handelChange={() => {}}
          /> 
          <FormField
          labelName="프로젝트 제목"
          placeholder="프로젝트 이름" 
          inputType="text"
          value={form.title}
          handelChange={() => {}}
           />  

        </div>
 
           <FormField
          labelName="프로젝트 설명"
          placeholder="어떤 프로젝트인지 알려주세요" 
          isTextArea
          inputType="text"
          value={form.description}
          handelChange={() => {}}
           /> 


          <div className="w-full flex justify-center items-center p-4 bg-[#1d35c0] h-[120px] rounded-[10px]">
            <img src={money} alt="money" className="w-[40px] h-[40px] object-contain"/>
            <h5 className="font-notosans font-bold text-[25px] text-white ml-[20px]">후원 금액을 달성해야 출금을 진행할 수 있습니다</h5>
          </div> 

          <div className="flex flex-wrap gap-[40px]">
            <FormField
            labelName="목표 금액"
            placeholder="ETH 0.50" 
            inputType="text"
            value={form.target}
            handelChange={() => {}}
            />  
            <FormField
            labelName="펀딩 기간"
            placeholder="펀딩 기간" 
            inputType="date"
            value={form.deadline}
            handelChange={() => {}}
            /> 
           </div>
           <FormField
          labelName="프로젝트 이미지"
          placeholder="이미지 url를 올려주세요" 
          inputType="url"
          value={form.target}
          handelChange={() => {}}
           />  

          <div className="flex justify-center items-center mt-[40px]">
            <CustomButton 
              btnType="submit"
              title="새로운 프로젝트 만들기"
              style="bg-[#1dc071]"
            />
          </div>

        
      </form>
    </div>
  )
}

export default CreateCampaign