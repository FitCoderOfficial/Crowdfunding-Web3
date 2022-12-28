import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';

const CampaignDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { donate, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchDonators = async () => {
    const data = await getDonations(state.pId);

    setDonators(data);
  }

  useEffect(() => {
    if(contract) fetchDonators();
  }, [contract, address])

  const handleDonate = async () => {
    setIsLoading(true);

    await donate(state.pId, amount); 

    navigate('/')
    setIsLoading(false);
  }

  return (
    <div>
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaign" className="w-full h-[410px] object-cover rounded-xl"/>
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%'}}>
            </div>
          </div>
        </div>

        <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
          <CountBox title="남은 날짜" value={`${remainingDays}`} />
          <CountBox title="모인 코인" value={state.amountCollected} />
          <CountBox title="총 후원자" value={`${donators.length}`} />
        </div>
      </div>

      <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-notosans font-semibold text-[18px] text-white uppercase">프로젝트 제작자</h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={thirdweb} alt="user" className="w-[60%] h-[60%] object-contain"/>
              </div>
              <div>
                <h4 className="font-notosans font-semibold text-[14px] text-white break-all">{state.owner}</h4>
                <p className="mt-[4px] font-notosans font-normal text-[12px] text-[#808191]">10개의 프로젝트</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-notosans font-semibold text-[18px] text-white uppercase">설명</h4>

              <div className="mt-[20px]">
                <p className="font-notosans font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.description}</p>
              </div>
          </div>

          <div>
            <h4 className="font-notosans font-semibold text-[18px] text-white uppercase">후원자들</h4>

              <div className="mt-[20px] flex flex-col gap-4">
                {donators.length > 0 ? donators.map((item, index) => (
                  <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                    <p className="font-notosans font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">{index + 1}. {item.donator}</p>
                    <p className="font-notosans font-normal text-[16px] text-[#808191] leading-[26px] break-ll">{item.donation}</p>
                  </div>
                )) : (
                  <p className="font-notosans font-normal text-[16px] text-[#808191] leading-[26px] text-justify">아직 아무도 후원하지 않았습니다. 첫 번째 후원자가 되어 주세요</p>
                )}
              </div>
          </div>
        </div>

        <div className="flex-1">
          <h4 className="font-notosans font-semibold text-[18px] text-white uppercase">후원하기</h4>   

          <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]">
            <p className="font-notosans fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
              비트코인으로 후원하기
            </p>
            <div className="mt-[30px]">
              <input 
                type="number"
                placeholder="ETH 0.1"
                step="0.01"
                className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-notosans text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                <h4 className="font-notosans font-semibold text-[15px] leading-[22px] text-white">후원 금액을 신중하게 결정해주세요</h4>
                <p className="mt-[20px] font-notosans font-normal leading-[22px] text-[#808191]"> 펀딩 종료일 후에는 프로젝트 특성상 <br /> '단순 변심에 의한 후원금 환불이 불가능' 합니다</p>
              </div>

              <CustomButton 
                btnType="button"
                title="후원하기"
                style="w-full bg-[#8c6dfd] text-[20px]"
                handleClick={handleDonate}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignDetails