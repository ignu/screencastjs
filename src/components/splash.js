import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchVideos from '../actions/index'
import Spinner from 'react-spinner'
import Video from './video'
import { Link } from 'react-router'

class Splash extends Component {
  static contextTypes = {
    store: React.PropTypes.object,
    video: React.PropTypes.object
  };

  componentDidMount() {
    this.context.store.dispatch(fetchVideos())
  }

  renderVideo() {
    if (!this.props.video) {
      return <div className="loading"><Spinner/></div>
    }
    else {
      return <Video video={ this.props.video } loggedIn={ this.props.loggedIn } />
    }
  }

  render() {
    return <div>
      <div className="blurb">
        The React ecosystem evolves at a rapid pace. <Link to="/register">Sign up for ReactCasts today</Link> for $7.99 a month to keep up with the latest in React, React Native and JavaScript libraries.
      </div>

      <h3>Latest Video:</h3>

      { this.renderVideo() }

      <Link to="/videos">View all Videos...</Link>

    </div>
  }
}

const mapStateToProps = (state) => {
  if(!state.videos) {
    return state
  }

  return {
    video: state.videos[state.videos.length -1],
    loggedIn: !!state.userId
  }
}

export default connect(mapStateToProps)(Splash)
