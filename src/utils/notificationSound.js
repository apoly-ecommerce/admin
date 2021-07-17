import {Howl, Howler} from 'howler';

export function notifySound() {
  const sound = new Howl({
    src: require('@/assets/audio/notification_sound.mp3'),
    volume: 0.4
  });
  sound.play();
}