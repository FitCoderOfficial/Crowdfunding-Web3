import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';

export const navlinks = [
  {
    name: '대쉬보드',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: '프로젝트',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: '결제',
    imgUrl: payment,
    link: '/',
    disabled: true,
  },
  {
    name: '출금',
    imgUrl: withdraw,
    link: '/',
    disabled: true,
  },
  {
    name: '프로필',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: '로그아웃',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];