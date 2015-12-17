import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Link } from 'react-router'
import { connect } from 'react-redux'
import saveUser from '../actions/user_actions'
import Error from './error'

const { Component } = React;

import videoStore from '../stores/video_store'
import Spinner from 'react-spinner'

class SignUpForm extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object
  }

  submit(e) {
    e.preventDefault()
    let json = {
      email: this.refs.email.getDOMNode().value,
      password: this.refs.password.getDOMNode().value,
      receiveEmails: this.refs.receiveEmails.getDOMNode().checked
    }
    this.context.store.dispatch(saveUser(json))
  }

  renderActions() {
    if (this.props.loading) { return <Spinner/> }

    return <div className="actions">
        <button className="button-primary">Submit</button>
      </div>
  }

  renderErrors() {
    return this.props.errors.map((e) => <Error message={e}/> )
  }

  render() {
    return <div className="wrapper">
      <h3>Register for ReactCasts.tv</h3>

      { this.renderErrors() }

      <form onSubmit={ this.submit.bind(this) }>

        <label htmlFor="email">Email</label>
        <input ref="email" id="email" type="email" />

        <label htmlFor="password">Password</label>
        <input ref="password" id="password" type="password" />

        <div>
          <input ref="receiveEmails" type="checkbox" name="emails" value="emails">I would like to receive emails about new views and JavaScript projects</input>
        </div>

        { this.renderActions() }
      </form>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.savingUser
    ,errors: state.errors
  }
}

export default connect(mapStateToProps)(SignUpForm)
