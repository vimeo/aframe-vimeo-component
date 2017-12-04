AFRAME.registerComponent('play-on-vrdisplayactivate-or-enter-vr', {
  init: function () {
    this.playVideo = this.playVideo.bind(this);
    this.playVideoNextTick = this.playVideoNextTick.bind(this);
  },
  play: function () {
    window.addEventListener('vrdisplayactivate', this.playVideo);
    this.el.sceneEl.addEventListener('enter-vr', this.playVideoNextTick);
  },
  pause: function () {
    this.el.sceneEl.removeEventListener('enter-vr', this.playVideoNextTick);
    window.removeEventListener('vrdisplayactivate', this.playVideo);
  },
  playVideoNextTick: function () {
    setTimeout(this.playVideo);
  },
  playVideo: function () {
    var video = this.el.components.material.material.map.image;
    if (!video) { return; }
    video.play();
  }
});