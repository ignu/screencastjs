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

  renderRegisterButton() {
    if(this.props.userId) {
      return <li className="three columns">
        <button onClick={this.logOut.bind(this)}>Log Out</button>
        </li>
    } else {
      return <li className="three columns">
          <Link to="/register" className="button button-primary">Sign Up</Link>
        </li>
    }
  }

  render() {
    return <div className="wrapper">
        <header id="#header" className="row">
          <div className="eight columns"><h1>ReactCasts.tv</h1></div>
          <div id="nav" className="four columns">
            <ul className="row">
              <li className="three columns">
                <Link to="/videos">Videos</Link>
              </li>

              <li className="three columns">
                <a href="#">About</a>
              </li>

              { this.renderRegisterButton() }

              <li className="three columns"></li>

            </ul>
          </div>
        </header>

      { this.props.children }

      </div>
  }
}

const mapStateToProps = (state) => {
  return { userId: state.userId }
}

export default connect(mapStateToProps)(App)
