import React, { useState, useEffect } from 'react';

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

const Profile = () => {
  
  const [isLoading, setIsLoading] = useState(false); //로딩 인디케이터
  const [campaigns, setCampaigns] = useState([]);    //third web에 등록된 프로젝트를 받음
  
  const { address, contract, getUserCampaigns } = useStateContext();

  const fetchCampaigns = async() => {
    setIsLoading(true);
    const data = await getUserCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns
      title="현재 진행중인 프로젝트"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Profile