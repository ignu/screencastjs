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
    showPost: React.PropTypes.bool
  }

  render() {
    const video = this.props.video
    let url = `/video_source/episode-${video.id}.mp4`

    let downloadLink, blogPost

    let videoHtml = <Link to="/register">
          <img src={video.image} alt={video.name} style={ { width: "640px" } }/>
        </Link>

    if (this.props.showPost) {
      blogPost = <div className="blog" dangerouslySetInnerHTML={ { __html: video.body } } />
    }


    if (this.props.loggedIn) {
      downloadLink = <a href={ url }>Download (.mp4)</a>
      videoHtml = <video controls width="640" resize="fase"><source src={ url } /></video>
    }

    return <div className="video-wrapper">

      <div className="title">
        <h4>{ video.name }</h4>
      </div>

      <div>
      { videoHtml }
      </div>

      { downloadLink }

      { blogPost }


    </div>
  }
}

export default Video
