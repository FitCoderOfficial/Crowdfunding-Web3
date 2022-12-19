// SPDX-License-Identifier: UNLICENSED
//기능 설정 페이지


pragma solidity ^0.8.9;

contract CrowdFunding {

    //캠페인에 사용될 값
    struct Campaign{
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image; 
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0; // 초기 캠페인 수

    function createCampaign(address _owner, string memory _title, string memory _description, 
                            uint256 _target, uint256 _deadline, string memory _image) public returns (uint256) {      //캠페인 매개변수 설정, 매개변수는 앞에 _를 붙임
                                Campaign storage campaign = campaigns[numberOfCampaigns];                            //캠페인 배열에 초기 설정값 부여
                                require(campaign.deadline < block.timestamp, 
                                "\xeb\xa7\x88\xea\xb0\x90\xec\x9d\xbc\xec\x9d\x84\x20\xec\x98\xac\xeb\xb0\x94\xeb\xa5\xb4\xea\xb2\x8c\x20\xec\x84\xa4\xec\xa0\x95\xed\x95\xb4\xec\x95\xbc\xed\x95\xa9\xeb\x8b\x88\xeb\x8b\xa4");      //캠페인 마감일이 항상 현재 타임라인보다 앞에 있어야함
                            
                                campaign.owner = _owner;
                                campaign.title = _title;
                                campaign.description = _description;
                                campaign.target = _target;
                                campaign.deadline = _deadline;
                                campaign.amountCollected = 0;
                                campaign.image = _image;

                                numberOfCampaigns++;      

                                return numberOfCampaigns - 1;                                                       
                            }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;                    // 메세지값 

        Campaign storage campaign = campaigns[_id];    //위의 매핑된 캠페인에 아이디 매개변수값 부여
        campaign.donators.push(msg.sender);            //기부자
        campaign.donations.push(amount);              //돈

        (bool send, ) = payable(campaign.owner).call{value: amount}("");

        if(send){
            campaign.amountCollected = campaign.amountCollected + amount;     //새로 들어온 기부금을 기존 기부금과 더해서 총액을 변경해줌
        }
    }

    function getDonators() {}

    function getCampaigns() {}
}