import React, { Component } from 'react'

class Footer extends Component {
  render() {
    const year = new Date().getFullYear()
    return (
      <footer className="static-s fixed-ns z-3 w-100 bottom-0 pa7 bg-white flex items-center justify-center-s justify-start-ns light-gray">
        <span className="mh2">&copy; {year}</span>
        <span>VTEX Extension Store</span>
      </footer>
    )
  }
}

export default Footer
