import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, Link } from 'react-router'
import { connect } from 'react-redux'
import { saveUser, addStripeInfo } from '../actions/user_actions'
import Error from './error'
import StripeCheckout from 'react-stripe-checkout'

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

    if (this.props.stripeToken) return <button className="button-primary">Submit</button>

    return <div/>

  }

  setToken(data) {
    this.context.store.dispatch(addStripeInfo(data))
  }

  renderStripe() {
    return <StripeCheckout
      panelLabel="Subscribe"
      currency="USD"
      stripeKey="pk_test_yFf84eQAfJv82ahlbB8BM3Hr"
      token={this.setToken.bind(this)}
      name="ReactCasts.tv"/>
  }

  renderErrors() {
    return this.props.errors.map((e) => <Error message={e}/> )
  }

  render() {
    return <div className="wrapper">

      ReactCasts is <strong>$8.99/month</strong> for two or more weekly videos about React, React Native and related build tools.

      <h3>Sign Up</h3>

      { this.renderErrors() }

      <form onSubmit={ this.submit.bind(this) }>
        <label htmlFor="email">Email</label>
        <input ref="email" id="email" type="email" />

        <label htmlFor="password">Password</label>
        <input ref="password" id="password" type="password" />

        <div className="labelRow">
          <input ref="receiveEmails" type="checkbox" id="emails" name="emails" value="emails"/>
          <label className="check-label" htmlFor="emails"> I would like to receive emails about new views and JavaScript projects</label>
        </div>

        <div className="actions">{ this.renderActions() }</div>
      </form>

      { this.renderStripe() }

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
