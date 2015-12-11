import React, { Component } from 'react'
import VideoList from './video_list'
import { connect } from 'react-redux'
import fetchVideos from '../actions/index'
import Spinner from 'react-spinner'

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
      return <div className="loading"><Spinner/></div>
   }

    return <VideoList videos={ state.videos } />
  }
}

const mapStateToProps = (x) => x

export default connect(mapStateToProps)(VideoListLoader)
