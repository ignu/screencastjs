import React from 'react'

export default class Error extends React.Component {
  static propTypes = {
    message: React.PropTypes.string
  }

  render() {
    console.log("this.props (from Error)", this.props)
    return <div className="error">{ this.props.message }</div>
  }
}
