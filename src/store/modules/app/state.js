import Cookie from 'js-cookie';
import { SIDEBAR_STATUS, APP_SIDE } from '@/constants';

export default {
  sidebar: {
    isOpen: Cookie.get(SIDEBAR_STATUS) ? !!+Cookie.get(SIDEBAR_STATUS) : true,
    isAnimation: true
  },
  device: 'desktop',
  size: Cookie.get(APP_SIDE) || 'medium',
  logo: {
    mini: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Vietravel_Logo.png',
    lg: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Vietravel_Logo.png'
  },
  dropDownMenuNameActive: '',
  copyright: 'All rights reserved.',
  version: '1.0.0',
  isLoading: false,
};