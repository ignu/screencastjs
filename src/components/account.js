import React from 'react'
import { cancel } from "../actions/user_actions"
import { connect } from 'react-redux'
import Spinner from 'react-spinner'

class Account extends React.Component {
  static contextTypes = {
    store: React.PropTypes.object
  }

  static propTypes = {
    message: React.PropTypes.string
  }

  cancel() {
    this.context.store.dispatch(cancel())
  }

  render() {
    if (this.props.savingUser) { return <Spinner/> }

    return <div>
      <button
        className="button button-primary"
        onClick={this.cancel.bind(this)}
      > Cancel Account </button>
    </div>
  }
}

const mapStateToProps = (state) => {
  return { savingUser: state.savingUser }
}

export default connect(mapStateToProps)(Account)
