import React from 'react';
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
  static propTypes = {
    video: React.PropTypes.object,
    loggedIn: React.PropTypes.bool,
  }

  render() {
    const video = this.props.video
    let url = `/video_source/episode-${video.id}.mp4`

    let downloadLink

    if (this.props.loggedIn) {
      downloadLink = <a href={ url }>Download (.mp4)</a>
    }

    return <div className="video-wrapper">

      <div className="title">
        { video.name }
        &nbsp;
        <Link to="/videos/1">View</Link>
      </div>

      <div>
        <video controls width="640" resize="fase">
          <source src={ url } />
        </video>
      </div>

    { downloadLink }

    </div>
  }
}

export default Video
