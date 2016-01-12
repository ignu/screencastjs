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
        Learn and keep up with React with two short videos a week.
      </div>

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
