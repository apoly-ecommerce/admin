import { PrivateChange } from '@/broadcasts/config.js';
import store from '@/store';

const change = PrivateChange.subscribe('private-user');

change.bind('user.created', data => {
  if (data.shop_id) {

  }
});