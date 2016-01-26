import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Link } from 'react-router'
import { connect } from 'react-redux'
import { loginUser } from '../actions/user_actions'
import Error from './error'
import videoStore from '../stores/video_store'
import Spinner from 'react-spinner'

class LoginForm extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object
  }

  submit(e) {
    e.preventDefault();

    let json = {
      email: this.refs.email.value,
      password: this.refs.password.value
    };

    this.context.store.dispatch(loginUser(json))
  }

  renderActions() {
    if (this.props.loading) { return <Spinner/> }

    return <div className="actions">
        <button className="button-primary">Submit</button>
      </div>
  }

  renderErrors() {
    return this.props.errors.map((e) => {
      return <Error message={e}/>
    })
  }

  render() {
    return <div className="wrapper">
      <h3>Login to ReactCasts.tv</h3>

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
  console.log(state)
  return {
    loading: state.loggingInUser
    ,errors: state.errors
  }
}

export default connect(mapStateToProps)(LoginForm)
