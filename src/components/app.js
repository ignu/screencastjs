import React from 'react'
import { logout } from "../actions/user_actions"
import { Link } from 'react-router'
import { connect } from 'react-redux'
const { Component } = React;

class App extends Component {
  static contextTypes = {
    store: React.PropTypes.object
  }

  logOut() {
    this.context.store.dispatch(logout())
  }

  renderAuthButtons() {
    if(this.props.userId) {
      return <div>
        <Link to="/videos">Videos</Link>
        <Link to="/account">Account</Link>
        <button onClick={this.logOut.bind(this)}>Log Out</button>
        </div>
    } else {
      return <div>
          <Link to="/videos">Videos</Link>
          <Link to="/login">Log In</Link>
          <Link to="/register" className="button button-primary">Sign Up</Link>
        </div>
    }
  }

  render() {
    return <div className="wrapper">
        <header id="header" className="row">
          <Link to="/"><img id="logo" src="/images/reactcasts-logo.png" alt="ReactCasts.tv"/></Link>

          { this.renderAuthButtons() }
        </header>

      <div>
        { this.props.children }
      </div>

      </div>
  }
}

const mapStateToProps = (state) => {
  return { userId: state.userId }
}

export default connect(mapStateToProps)(App)
