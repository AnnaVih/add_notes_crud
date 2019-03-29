import React, { Component } from 'react'

class Note extends Component {
  render() {
      console.log(this.props)
    return (
      <div className="note">
        <p>{this.props.note.text}</p>
      </div>
    )
  }
}

export default Note;
