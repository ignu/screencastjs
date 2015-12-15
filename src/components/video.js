import React from 'react';
import VideoJs from 'react-videojs'
import { Link } from 'react-router'

const onReport = ({eventName}) => {
  console.log(eventName);
};

const plugin = function() {
  const player = this;
  player.on('timeupdate', () => console.log('Hello from plugin!'));
};

const plugins = [{name: 'myPlugin', func: plugin}];

class Video extends React.Component {
  render() {
    const video = this.props.video
    let url = `/video_source/episode-${video.id}.mp4`

    return <div className="video-wrapper">

      <Link to="/videos/1">View</Link>
      <div className="title">{ video.name }</div>

      <VideoJs
        plugins = {plugins}
        resize={ false }
        startWithControlBar = {true}
        reportingCallback = {onReport}
        width="640"
        src={[ url ]}/>

      <a href={ url }>Download (.mp4)</a>

    </div>
  }
}

export default Video
