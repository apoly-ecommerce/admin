import Pusher from 'pusher-js';
import store  from '@/store';

function InitPusher() {

  this.api_key    = '644241614abb9f91947c';
  this.options    = { cluster: 'us2', encrypted: true, };
  this.pusher     = null;
  this.channels   = [];

  /**
   * Using private channel.
   *
   * @param {String} channel_name
   * @param {Func} callback
   * @returns void
   */
  this.privateChannel = (channel_name, callback) => {
    this.options = { ...this.options, authorizer: this.authorizer };
    this.channel('private-' + channel_name, callback);
  };

  /**
   * Using public channel.
   *
   * @param {String} channel_name
   * @param {Func} callback
   * @returns void
   */
  this.channel = (channel_name, callback) => {
    this.pusher = new Pusher(this.api_key, this.options);

    let channel = this.pusher.subscribe(channel_name);

    if (! this.channels.includes(channel)) {
      this.channels.push(channel_name);
    }

    callback(channel);
  };


  /**
   *  Get list channels.
   *
   * @returns array
   */
  this.getChannels = () => {
    return this.channels;
  }

  /**
   * Unsubscribe channel
   * @param {String} channel_name
   */
  this.unsubscribe = (channel_name) => {
    this.pusher.subscribe(channel_name);
  }

  /**
   * Authorization pusher.
   *
   * @param {Object} channel
   * @param {Object} options
   */
  this.authorizer = (channel, options) => {
    return {
      authorize: (socketId, callback) => {
        const data = {
          socket_id: socketId,
          channel_name: channel.name
        };
        store.dispatch('auth/pusherAuth', data)
        .then(res => {
          callback(null, res);
        })
        .catch(err => {
          console.error(`Init Pusher Error: ${err}`);
        });
      }
    }
  }
}

export default new InitPusher;