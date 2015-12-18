import React from 'react';
import history from './history'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from "../src/components/app"
import videoStore from '../src/stores/video_store'
import VideoListLoader from '../src/components/video_list_loader'
import SignUpForm from '../src/components/sign_up_form'
import LoginForm from '../src/components/login_form'
import { Router, Route, IndexRoute } from 'react-router'

render((
    <Provider store={videoStore}>
      <Router history={ history }>
        <Route path="/" component={ App }>
          <IndexRoute component={ VideoListLoader } />

          <Route path="videos" component={ VideoListLoader } >
            <Route path=":id" component={ VideoListLoader } />
          </Route>

          <Route path="register" component={ SignUpForm } />
          <Route path="login"    component={ LoginForm } />

        </Route>
      </Router>
    </Provider>
), document.getElementById("app"))
