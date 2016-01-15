import React from 'react';
import Video from './video'

class VideoList extends React.Component {
  static propTypes = {
    videos: React.PropTypes.array.isRequired
  }

  renderVideos() {
    let videos = this.props.videos

    return videos.map((video) => {
      return <Video key={`video-${video.id}`} video={ video } showPost={ true } loggedIn={ this.props.loggedIn }/>
    })
  }

  render() {
    return <div>
        { this.renderVideos() }
      </div>
  }
}

export default VideoList
