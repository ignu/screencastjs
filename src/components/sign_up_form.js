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
      email: this.refs.email.value,
      password: this.refs.password.value,
      receiveEmails: this.refs.receiveEmails.checked,
      stripeInfo: this.props.stripeInfo
    }
    this.context.store.dispatch(saveUser(json))
  }

  renderActions() {
    if (this.props.loading) { return <Spinner/> }

    if (this.props.stripeInfo) return <button className="button-primary">Submit</button>

    return <div/>
  }

  setToken(data) {
    this.context.store.dispatch(addStripeInfo(data))
  }

  renderStripe() {
    if (this.props.stripeInfo) return <div/>
    return <StripeCheckout
      panelLabel="Subscribe"
      currency="USD"
      stripeKey="pk_test_yFf84eQAfJv82ahlbB8BM3Hr"
      token={this.setToken.bind(this)}
      panelLabel="Continue"
      allowRememberMe={false}
      name="Sign up for ReactCasts">
        <button className="button button-primary">
          Sign Up for $8.99/month
        </button>
      </StripeCheckout>
  }

  renderErrors() {
    return this.props.errors.map((e) => <Error message={e}/> )
  }

  renderForm() {
    if (!this.props.stripeInfo) return <div/>
    return <form onSubmit={ this.submit.bind(this) }>
        <h3>Complete Registration</h3>

        <label htmlFor="email">Email</label>
        <input ref="email" id="email" type="email" defaultValue={this.props.stripeInfo.email}/>

        <label htmlFor="password">Password</label>
        <input ref="password" id="password" type="password" />

        <div className="labelRow">
          <input ref="receiveEmails" defaultChecked="true" type="checkbox" id="emails" name="emails" value="emails"/>
          <label className="check-label" htmlFor="emails"> I would like to receive emails about new videos and projects</label>
        </div>

        <div className="actions">{ this.renderActions() }</div>
      </form>
  }

  render() {
    return <div className="wrapper">

      ReactCasts is <strong>$8.99/month</strong> for two or more weekly videos about React, React Native and related build tools.

      { this.renderErrors() }

      { this.renderForm() }

      { this.renderStripe() }
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    stripeInfo: state.stripeInfo,
    errors: state.errors,
    loading: state.savingUser,
  }
}

export default connect(mapStateToProps)(SignUpForm)
