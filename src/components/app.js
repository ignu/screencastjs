import React from 'react';
import { Provider } from 'react-redux'
const { Component } = React;
import videoStore from '../stores/video_store'
import VideoListLoader from './video_list_loader'

class App extends React.Component {
  render() {
    return <Provider store={videoStore}>
      <VideoListLoader/>
    </Provider>
  }
}

export default App
