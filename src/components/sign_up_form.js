import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Link } from 'react-router'
import { connect } from 'react-redux'
import saveUser from '../actions/user_actions'

const { Component } = React;

import videoStore from '../stores/video_store'
import Spinner from 'react-spinner'


class Error extends React.Component {
  static propTypes = {
    message: React.PropTypes.string
  }

  render() {
    return <div className="error">{ this.props.message }</div>
  }
}

class SignUpForm extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object
  }

  submit(e) {
    e.preventDefault()
    let json = {
      email: this.refs.email.getDOMNode().value,
      password: this.refs.password.getDOMNode().value
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
