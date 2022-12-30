import React,{ useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { money } from '../assets';
import { CustomButton, FormField, Loader } from '../components';
import { checkIfImage } from '../utils';


 
const CreateCampaign = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading ] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: '',
    title: '',
    description: '',
    target: '', 
    deadline: '',
    image: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async(exists) => {
      if(exists) {
        setIsLoading(true)
        await createCampaign({ ...form, target: ethers.utils.parseUnits(form.target, 18)})
        console.log(form);
        setIsLoading(false);
        navigate('/')
      } else {
        alert('유효하지 않은 이미지 url 입니다')
        setForm({ ...form, image:""});
      }
    })
  }

  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4'>
      {isLoading && <Loader />}
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
          handleChange={(e) => handleFormFieldChange('name', e)}
          />
          <FormField
          labelName="프로젝트 제목"
          placeholder="프로젝트 이름" 
          inputType="text"
          value={form.title}
          handleChange={(e) => handleFormFieldChange('title', e)}
           />  

        </div>
 
           <FormField
          labelName="프로젝트 설명"
          placeholder="어떤 프로젝트인지 알려주세요" 
          isTextArea
          inputType="text"
          value={form.description}
          handleChange={(e) => handleFormFieldChange('description', e)}
           /> 
 

          <div className="flex flex-wrap gap-[40px]">
            <FormField
            labelName="목표 금액"
            placeholder="ETH 0.50" 
            inputType="number"
            value={form.target}
            handleChange={(e) => handleFormFieldChange('target', e)}
            />  
            <FormField
            labelName="펀딩 기간"
            placeholder="펀딩 기간" 
            inputType="date"
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
            /> 
           </div>

           <FormField
          labelName="프로젝트 이미지"
          placeholder="이미지 url를 올려주세요" 
          inputType="url"
          value={form.image}
          handleChange={(e) => handleFormFieldChange('image', e)}
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