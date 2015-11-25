import React from 'react';
import ReactDom from 'react-dom'
import VideoList from "../src/components/video_list"

class App extends React.Component {
  render() {
    return <div>
      <VideoList />
     </div>
  }
}

ReactDom.render(<App />, document.getElementById("app"));
