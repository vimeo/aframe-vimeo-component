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
    volume: { type: 'number', default: 1.0 },
    leftEye: { type: 'selector' },
    rightEye: { type: 'selector' }
  },
  init: function () {
    console.log('Hello Vimeo 🎥 version: ', Vimeo.version);

    if (this.data.leftEye && this.data.rightEye) {
      console.log('[Vimeo] loading stereo spherical video');
      this.isStereoSpherical = true;
    }

    this.player = new Vimeo.Player(this.data.id, { 
      autoplay: this.data.autoplay, 
      autoload: this.data.autoload,
      muted: this.data.muted,
      loop: this.data.loop
    });

    // Once the video loads iterate over all objects nested under the <a-entity vimeo /> and assign the textures
    this.player.on('videoLoad', function (videoTexture) {
      this.player.setVolume(this.data.volume);
      if (this.isStereoSpherical) {
        leftEye.object3D.remove(leftEye.object3D.children[0]);
        leftEye.object3D.remove(leftEye.object3D.children[1]);
        var geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
        var material = new THREE.MeshBasicMaterial( { map: videoTexture } );
        // Left eye sphere
        geometry.scale( -1, 1, 1 );
        var uvs = geometry.attributes.uv.array;
        for ( var i = 0; i < uvs.length; i += 2 ) {
          uvs[ i + 1 ] *= 0.5;
        }
        var mesh = new THREE.Mesh( geometry, material );
        mesh.rotation.y = - Math.PI / 2;
        mesh.layers.set( 1 );
        scene.add( mesh );
        // Right eye sphere
        var geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
        geometry.scale( - 1, 1, 1 );
        var uvs = geometry.attributes.uv.array;
        for ( var i = 0; i < uvs.length; i += 2 ) {
          uvs[ i + 1 ] *= 0.5;
          uvs[ i + 1 ] += 0.5;
        }
        var mesh = new THREE.Mesh( geometry, material );
        mesh.rotation.y = - Math.PI / 2;
        mesh.layers.set( 2 );
        scene.add( mesh );

      } else {
        this.traverseAndSetVideoTextures(this.el.object3D, videoTexture);
      }
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
  },
  traverseAndSetVideoTextures: function (object, tex) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material.color = null;
        child.material.map = tex;
        child.material.needsUpdate = true;
      }
    });
  },
});