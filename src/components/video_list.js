import React from 'react';
import Video from './video'

class VideoList extends React.Component {
  static propTypes = {
    videos: React.PropTypes.array.isRequired
  }

  static defaultProps = {
    videos: [ { id: 1, name: " Setting up your environment" },
              { id: 2, name: " Writing our first component" } ]
  }

  renderVideos() {
    return this.props.videos.map((video) => {
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
