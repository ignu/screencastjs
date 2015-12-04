import React from 'react';
import Controls from 'react-h5-video'
import VideoJs from 'react-videojs'

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

    return <div>
      <div>{ video.name }</div>
      <VideoJs
        plugins = {plugins}
        reportingCallback = {onReport}
        src={[`/videos/episode-${video.id}.mp4` ]}/>
    </div>
  }
}

export default Video
