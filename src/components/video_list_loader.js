import React, { Component, PropTypes } from 'react'
import VideoList from './video_list'
import { connect } from 'react-redux'
import fetchVideos from '../actions/index'

class VideoListLoader extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  }

  componentDidMount() {
    this.context.store.dispatch(fetchVideos())
  }

  render() {
    let state = this.context.store.getState()

    if (state.loading) {
      return <div className="loading">Loading...</div>
   }

    return <VideoList videos={ this.context.store.getState().videos } />
  }
}

const mapStateToProps = (x) => x

export default connect(mapStateToProps)(VideoListLoader)
