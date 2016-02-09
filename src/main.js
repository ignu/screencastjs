import React from 'react';
import history from './history'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from "../src/components/app"
import videoStore from '../src/stores/video_store'
import VideoListLoader from '../src/components/video_list_loader'
import Splash from '../src/components/splash'
import SignUpForm from '../src/components/sign_up_form'
import LoginForm from '../src/components/login_form'
import Account from '../src/components/account'
import { Router, Route, IndexRoute } from 'react-router'
import GoogleAnalytics from 'react-g-analytics'

render((
    <Provider store={ videoStore }>
      <Router history={ history }>
        <Route path="/" component={ App }>
          <GoogleAnalytics id="UA-73556814-1" />
          <IndexRoute component={ Splash } />

          <Route path="videos" component={ VideoListLoader } >
            <Route path=":id" component={ VideoListLoader } />
          </Route>

          <Route path="account"  component={ Account } />
          <Route path="register" component={ SignUpForm } />
          <Route path="login"    component={ LoginForm } />

        </Route>
      </Router>
    </Provider>
), document.getElementById("app"))
