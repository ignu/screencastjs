import React from 'react';
import Controls from 'react-h5-video'

class Video extends React.Component {
  render() {
    const video = this.props.video

    return <div>
      <div>{ video.name }</div>
      <Controls sources={ [`/videos/episode-${video.id}.mp4`]}/>
    </div>
  }
}

export default Video
