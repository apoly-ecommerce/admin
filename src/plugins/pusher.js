import Vue from 'vue';
import Pusher from 'pusher-js';

Vue.use(Pusher);

const pusher = new Pusher('644241614abb9f91947c', {
  encrypted: true,
  cluster: 'us2',
});

export default pusher;