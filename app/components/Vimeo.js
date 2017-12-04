/* eslint-disable */

const React = require('react');
const axios = require('axios');

class Vimeo extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      videos: null,
      spatial: false,
      stereo_format: 'mono'
    };
  }

  componentDidMount() {
    var self = this;
    var id = this.props.id;
    
    if (this.props.url != null) {
      id = this.props.url.match(/\/?([0-9]+)/)[1];
    }
    
    axios.get('/video/' + id).then(res => {
      this.setState({ 
        videos:        res.data['files'],
        spatial:       res.data['spatial'],
        stereo_format: res.data['spatial'] ? res.data['spatial']['stereo_format'] : 'mono'
      });
    });
  }

  render() {
    if (this.state.videos == null) {  
      return <div>Loading!</div>
    }
    
    var width = this.props.width || 16;
    var height = this.props.height || 9;
    var aspect_ratio = height / width;
    
    var video_assets = 
      <a-assets timeout="1">
        <video id="vimeo" style={{display: "none"}} autoPlay loop crossOrigin="anonymous" playsInline webkit-playsinline="true" muted={this.props.muted}>
          {this.state.videos.map(function(video, i){
            if (video != null) {
              if (video['width'] != null) {
                aspect_ratio = parseInt(video['height']) / parseInt(video['width']);
                return <source key={i} type={video['type']} src={video['link']} width={video['width']} height={video['height']} />
              }
              else {
                return <source key={i} type={video['type']} src={video['link']} />
              }
            }
          })}
        </video>
      </a-assets>;

    var video_display;
    
    // 360 video
    if (this.state.spatial) {
      
      // Stereoscopic video
      if (this.state.stereo_format != 'mono') {
        video_display = [
          <a-entity geometry="primitive: sphere;
            radius: 100;
            segmentsWidth: 64;
            segmentsHeight: 64;"
            material="shader: flat; src: #vimeo;"
            scale="-1 1 1" stereo="eye:left; split: vertical;">
          </a-entity>,
          <a-entity geometry="primitive: sphere;
            radius: 100;
            segmentsWidth: 64;
            segmentsHeight: 64;"
            position={this.props.position}   
            rotation={this.props.rotation} 
            material="shader: flat; src: #vimeo;"
            scale="-1 1 1" stereo="eye:right; split: vertical;">
          </a-entity>
        ];
      }
      // Monoscopic video
      else {
        video_display = [
          <a-entity geometry="primitive: sphere;
            radius: 100;
            segmentsWidth: 64;
            segmentsHeight: 64;"
            position={this.props.position}   
            rotation={this.props.rotation} 
            material="shader: flat; src: #vimeo;"
            scale="-1 1 1">
          </a-entity>
        ];
      }
    }
    // Regular video
    else {
      video_display = <a-video src="#vimeo" 
        width={width} 
        height={width * aspect_ratio} 
        position={this.props.position}   
        rotation={this.props.rotation} 
        scale={this.props.scale} 
        play-on-window-click play-on-vrdisplayactivate-or-enter-vr />;
    }

    return [
      video_assets,
      video_display
    ];
  }
}
 
module.exports = Vimeo;