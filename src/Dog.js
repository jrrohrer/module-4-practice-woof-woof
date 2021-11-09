import React from 'react'

class Dog extends React.Component {
  render() {
    return (
      <div>
        <span onClick={() => this.props.handleClick(this.props.dog)}>{this.props.dog.name}</span>
      </div>
    )
  }
}

export default Dog
