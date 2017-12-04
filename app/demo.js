/* eslint-disable */

const React = require('react');
const ReactDOM = require('react-dom');
const Vimeo = require('./components/Vimeo');

class Demo extends React.Component{
  render() {
    return (
      <a-scene>
        <a-assets>
          <img id="skymap" crossOrigin="anonymous" src="https://cdn.glitch.com/fc6836f8-3375-4a38-b2c4-90273a4a349e%2Fsky.jpg?1511378241695" />
        </a-assets>
        
        <Vimeo url="https://vimeo.com/244123293" position="0 3 -15" width="16" />

        <a-entity id="powered-by-vimeo" position="6 5 35" scale="10 10 10" gltf-model="url(https://cdn.glitch.com/fc6836f8-3375-4a38-b2c4-90273a4a349e%2Fpowered-by-vimeo.gltf?1511887428199)" shadow="cast: true; receive: true;"></a-entity>
        <a-light id="screen-light" type="point" position="0 3.5 -16.6" rotation="0 180 0" light="penumbra: 1; angle: 98.27; type: spot; intensity: 0.65; decay: 40.92; castShadow: true; color: #fff"></a-light>
        <a-light type="point" light="color: #fff; intensity:0.4 castShadow: true;" position="3 10 1"></a-light>
        
        <a-plane position="0 -4 0" rotation="-90 0 0" width="1000" height="1000" color="#7BC8A4" material="roughness:1; metalness:0;" shadow="cast: false; receive: true;"></a-plane>
      
        <a-entity id="sky" geometry="primitive:sphere; radius:100; phiLength:360; phiStart:0; thetaLength:90" material="shader:flat; side:back; height:2048; src:#skymap; width:2048"></a-entity>
      </a-scene>
    );
    
  }
}

module.exports = Demo;
ReactDOM.render(<Demo />, document.getElementById('root'));