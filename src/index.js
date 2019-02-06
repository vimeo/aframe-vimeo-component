/* eslint-disable */
const Vimeo = require('./../ext/vimeo-threejs-player/dist/vimeo_threejs_player');

AFRAME.registerComponent('vimeo', {
  multiple: true,
  schema: {
    id: { type: 'number', default: 0 },
    autoplay: { type: 'bool', default: true },
    autoload: { type: 'bool', default: true },
    muted: { type: 'bool', default: false },
    loop: { type: 'bool', default: true },
    volume: { type: 'number', default: 1.0 }
  },
  init: function () {
    console.log('Hello Vimeo! version: ', Vimeo.version);

    this.player = new Vimeo.Player(this.data.id, { 
      autoplay: this.data.autoplay, 
      autoload: this.data.autoload,
      muted: this.data.muted,
      loop: this.data.loop
    });

    // Once the video loads iterate over all objects nested under the <a-entity vimeo /> and assign the textures
    this.player.on('videoLoad', function (videoTexture) {
      this.player.setVolume(this.data.volume);
      this.el.object3D.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          child.material.color = null;
          child.material.map = videoTexture;
          child.material.needsUpdate = true;
        }
      });
    }.bind(this));
  },
  load: function () {
    if (this.player) {
      this.player.load();
    }
  },
  play: function () {
    if (this.player.video.isLoaded()) {
      if (this.player.isPaused()) {
        this.player.play();
      }
    }
  },
  pause: function () {
    if (this.player.video.isLoaded()) {
      if (this.player.isPlaying()) {
        this.player.pause();
      }
    }
  },
  stop: function () {
    if (this.player.video.isLoaded()) {
      if (this.player.isPlaying()) {
        this.player.stop();
      }
    }
  },
  update: function () {
  },
  tick: function () {
  }
});