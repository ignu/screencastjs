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
    if (this.props.loading) {
      return <div className="loading"><Spinner/></div>
    }

    return <VideoList { ...this.props } />
  }
}

const mapStateToProps = (x) => {
  return {
    loggedIn: !!x.userId,
    videos: x.videos,
    loading: x.loading
  }
}

export default connect(mapStateToProps)(VideoListLoader)
