import React from 'react';
import { Provider } from 'react-redux'
const { Component } = React;
import videoStore from '../stores/video_store'
import VideoList from './video_list'

class App extends React.Component {
  render() {
    return <Provider store={videoStore}>
      <VideoList/>
    </Provider>
  }
}

export default App
