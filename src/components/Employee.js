import React, { Component } from 'react'

class Employee extends Component {
  render() {
    return (
      <div>
        <div>
        <div> {this.props.email}</div> 
        <div > {this.props.tech}</div> 
        </div>
      </div>
    )
  }
}

export default Employee