import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { EditionMetadataWithOwnerOutputSchema } from '@thirdweb-dev/sdk';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const { contract } = useContract('0xB7EEb10Fdc22e3De8b76347462792AD1aF6837F8'); //third web에 등록된 주소입력
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask();

    const publishCampaign = async(form) => {
        try {
            const data = await createCampaign([
                address, //프로젝트 만든 사람 
                form.title, 
                form.description, 
                form.target,
                new Date(form.deadline).getTime(),
                form.image
            ])

            console.log("프로젝트가 성공적으로 등록되었습니다.", data)
        }catch(error){
            console.log("프로젝트가 등록되지 않았습니다.", error)
         }        
    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');
        console.log(campaigns)
        const parsedCampaings = campaigns.map((campaign, i)=> ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: i
        }));
        console.log(parsedCampaings)
        return parsedCampaings;
    }

    const getUserCampaigns = async () => {
        const allCampaigns = await getCampaigns();
        const filteredCampaigns = allCampaigns.filter((campaign) => 
        campaign.owner === address);
        return filteredCampaigns;
    }

    const donate = async(pId, amount) => {
        const data = await contract.call('donateToCampaign', pId, address, amount);

        return data;
    }



    
    return (
        <StateContext.Provider 
            value={{
                address,
                contract,
                connect,
                createCampaign: publishCampaign,
                getCampaigns,
                getUserCampaigns,
            }}
        >
        {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);
