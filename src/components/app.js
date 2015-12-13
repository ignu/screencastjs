import React from 'react'
import { Link } from 'react-router'
const { Component } = React;

class App extends Component {
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

              <li className="three columns">
                <Link to="/register" className="button button-primary">Sign Up</Link>
              </li>

              <li className="three columns"></li>
            </ul>
          </div>
        </header>

      { this.props.children }

      </div>
  }
}

export default App
