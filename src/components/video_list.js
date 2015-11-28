import React from 'react';
import Video from './video'

class VideoList extends React.Component {
  constructor() {
    super()
    this.propTypes = {
      videos: React.PropTypes.array.isRequired
    }

    this.defaultProps = {
      videos: [ { name: " Setting up your environment" },
                { name: " Writing our first component" } ]
    }
  }

  renderVideos() {
    return this.props.videos.map((video) => {
      return <Video name={ video.name } />
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
