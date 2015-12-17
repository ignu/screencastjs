import React from 'react'

export class Error extends React.Component {
  static propTypes = {
    message: React.PropTypes.string
  }

  render() {
    return <div className="error">{ this.props.message }</div>
  }
}
