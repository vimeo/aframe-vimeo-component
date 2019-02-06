/* eslint-disable */
const Vimeo = require('./../ext/vimeo-threejs-player/dist/vimeo_threejs_player');

AFRAME.registerComponent('vimeo', {
  multiple: true,
  schema: {
    id: {type: 'number', default: ''}
  },
  init: function () {
    console.log('Hello Vimeo! version: ', Vimeo.version);

    this.player = new Vimeo.Player(this.data.id, { autoplay: true, autoload: true });
    
    // Once the video loads iterate over all objects nested under the <a-entity vimeo /> and assign the textures
    this.player.on('videoLoad', function (videoTexture) {
      this.el.object3D.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
          child.material.color = null;
          child.material.map = videoTexture;
          child.material.needsUpdate = true;
          console.log(child.material.map);
        }
      });
    }.bind(this));
  },
  update: function () {
  },
  tick: function () {
  }

});