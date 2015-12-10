import React from 'react';
import ReactDom, { render } from 'react-dom'
import App from "../src/components/app"
import videoStore from '../src/stores/video_store'
import VideoListLoader from '../src/components/video_list_loader'
import SignUpForm from '../src/components/sign_up_form'
import { Router, Route, Link } from 'react-router'

render((
    <Router>
      <Route path="/" component={App}>
        <Route path="videos" component={VideoListLoader} />
        <Route path="register" component={SignUpForm} />
      </Route>
    </Router>
), document.getElementById("app"))
