import React from 'react';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from "../src/components/app"
import videoStore from '../src/stores/video_store'
import VideoListLoader from '../src/components/video_list_loader'
import SignUpForm from '../src/components/sign_up_form'
import { Router, Route } from 'react-router'

render((
    <Provider store={videoStore}>
      <Router>
        <Route path="/" component={App}>
          <Route path="videos" component={VideoListLoader} />
          <Route path="register" component={SignUpForm} />
        </Route>
      </Router>
    </Provider>
), document.getElementById("app"))
