import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Link } from 'react-router'

const { Component } = React;

import videoStore from '../stores/video_store'

class SignUpForm extends React.Component {
  render() {
    return <div className="wrapper">
      <h1>Register for ReactCasts.tv</h1>
      <form>

        <label for="email">Email</label>
        <input id="email" type="email" />

        <label for="password">password</label>
        <input id="password" type="password" />

        <div className="actions">
          <button className="button-primary">Submit</button>
        </div>
      </form>
    </div>
  }
}

export default SignUpForm
