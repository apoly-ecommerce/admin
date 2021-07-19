import Pusher from 'pusher-js';
import { pusherAuthorizer } from '@/helpers';

export const PrivateChange = new Pusher('644241614abb9f91947c', {
  cluster: 'us2',
  encrypted: true,
  authorizer: pusherAuthorizer,
});

var pusher = new VuePusher('api_key', options);

pusher.PrivateChannel('user', {

}, authorizer);