/* global THREE, AFRAME */
const Vimeo = require('./../ext/vimeo-threejs-player/dist/vimeo-threejs-player.min')

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
    rightEye: { type: 'selector' },
    quality: { type: 'string', default: 'auto' }
  },
  init: function () {
    if (this.data.leftEye && this.data.rightEye) {
      this.isStereoSpherical = true
    }

    this.player = new Vimeo.Player(this.data.id, {
      autoplay: this.data.autoplay,
      autoload: this.data.autoload,
      muted: this.data.muted,
      loop: this.data.loop,
      quality: this.data.quality
    })

    // Once the video loads iterate over all objects nested under the <a-entity vimeo /> and assign the textures
    this.player.on('videoLoad', function (videoTexture) {
      this.player.setVolume(this.data.volume)
      if (this.isStereoSpherical) {
        // Create and configure the spheres for stereo webvr
        this.createAndAppendStereoSpheresToElement(this.data.leftEye, this.data.rightEye)
        this.traverseAndSetVideoTextures(this.data.leftEye.object3D, videoTexture)
        this.traverseAndSetVideoTextures(this.data.rightEye.object3D, videoTexture)
      } else {
        this.traverseAndSetVideoTextures(this.el.object3D, videoTexture)
      }
    }.bind(this))
  },
  load: function () {
    if (this.player) {
      this.player.load()
    }
  },
  play: function () {
    this.player.play()
  },
  pause: function () {
    this.player.pause()
  },
  stop: function () {
    this.player.stop()
  },
  traverseAndSetVideoTextures: function (object, tex) {
    object.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material.color = null
        child.material.map = tex
        child.material.needsUpdate = true
      }
    })
  },
  traverseAndRemoveChildMeshes: function (object) {
    object.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        object.remove(child)
      }
    })
  },
  createAndAppendStereoSpheresToElement: function (leftEyeElm, rightEyeElm) {
    // If there is pre-existing geomtery in the eye components get rid of it, we will generate it
    if (leftEyeElm.object3D.children.length > 0) {
      this.traverseAndRemoveChildMeshes(leftEyeElm.object3D)
    }
    if (rightEyeElm.object3D.children.length > 0) {
      this.traverseAndRemoveChildMeshes(rightEyeElm.object3D)
    }

    // Build custom geomtery with split UVs for each eye
    var geometry = new THREE.SphereBufferGeometry(500, 60, 40)
    var material = new THREE.MeshBasicMaterial()

    // Left eye sphere
    geometry.scale(-1, 1, 1)
    var uvs = geometry.attributes.uv.array
    for (var i = 0; i < uvs.length; i += 2) {
      uvs[ i + 1 ] *= 0.5
    }
    var mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.y = -Math.PI / 2
    leftEyeElm.object3D.add(mesh)
    leftEyeElm.object3D.layers.set(1)

    // Right eye sphere
    geometry = new THREE.SphereBufferGeometry(500, 60, 40)
    geometry.scale(-1, 1, 1)
    uvs = geometry.attributes.uv.array
    for (var j = 0; j < uvs.length; j += 2) {
      uvs[ j + 1 ] *= 0.5
      uvs[ j + 1 ] += 0.5
    }
    mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.y = -Math.PI / 2
    rightEyeElm.object3D.add(mesh)
    rightEyeElm.object3D.layers.set(2)
  }
})
