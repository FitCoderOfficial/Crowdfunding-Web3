import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loader } from '../assets';
import FundCard from './FundCard';


const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();
  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, {state: campaign})
  }
  return (
    <div className='font-notosans font-bold text-[18px] text-left text-white'>
      <h1>{title} {campaigns.length}개 있습니다</h1>

      <div className='flex flex-wrap mt-[20px] gap-[26px] '>
        {isLoading && (
          <img src={loader} alt='loader' className='w-[100px] h-[100px]'/>
        )}
        {!isLoading && campaigns.length === 0 && ( 
          <p className='font-notosans font-semibold text-[16px] leading-[30px]'>현재 어떤 프로젝트도 생성하지 않았습니다 </p>
        )}
        
        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard key={campaign.id}{...campaign} handleClick={() => handleNavigate(campaign)} />)}
        
      </div>

      </div>
  )
}

export default DisplayCampaigns