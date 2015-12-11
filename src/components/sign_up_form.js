import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Link } from 'react-router'
import { connect } from 'react-redux'
import saveUser from '../actions/user_actions'

const { Component } = React;

import videoStore from '../stores/video_store'
import Spinner from 'react-spinner'

class SignUpForm extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object
  }

  submit(e) {
    e.preventDefault()
    this.context.store.dispatch(saveUser())
  }

  renderActions() {
    if (this.props.loading) { return <Spinner/> }

    return <div className="actions">
        <button className="button-primary">Submit</button>
      </div>
  }

  render() {

    return <div className="wrapper">
      <h3>Register for ReactCasts.tv</h3>
      <form onSubmit={ this.submit.bind(this) }>

        <label htmlFor="email">Email</label>
        <input id="email" type="email" />

        <label htmlFor="password">Password</label>
        <input id="password" type="password" />

        { this.renderActions() }
      </form>
    </div>
  }
}

const mapStateToProps = (state) => { return { loading: state.savingUser } }

export default connect(mapStateToProps)(SignUpForm)
