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
      return <Video video={ this.props.video } />
    }
  }

  render() {
    return <div>
      <div className="blurb">
        The React ecosystem evolves at a rapid pace. <Link to="/register">Sign up for ReactCasts today</Link> for $7.99 amonth to keep up with the latest in React, React Native and JavaScript libraries with two short videos a week.
      </div>

      <h5>Latest Video:</h5>

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
    video: state.videos[0]
  }
}

export default connect(mapStateToProps)(Splash)
