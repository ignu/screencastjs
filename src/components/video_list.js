import React from 'react';
import Video from './video'

class VideoList extends React.Component {
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

VideoList.defaultProps = {
  videos: [ {name: " Setting up your environment" },
            {name: " Writing our first component" } ]
};

VideoList.propTypes = {
  videos: React.PropTypes.array.isRequired
};

export default VideoList
