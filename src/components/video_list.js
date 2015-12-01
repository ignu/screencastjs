import React from 'react';
import Video from './video'

class VideoList extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object
  }

  renderVideos() {
    console.log(this.context)
    let videos = this.context.store.getState().videos

    return videos.map((video) => {
      return <Video key={`video-${video.id}`} name={ video.name } />
    })
  }

  render() {
    return <div>
        <h3>Videos</h3>
        { this.renderVideos() }
      </div>
  }
}

export default VideoList
