import React, { Component } from 'react'

class Footer extends Component {
  render() {
    const year = new Date().getFullYear()
    return (
      <footer className="w-100 bottom-0 pa7 bg-near-black flex items-center white">
        <div className="tc mh2">&copy; {year}</div>
        <div className="cf tc flex items-center justify-center">
          VTEX Extension Store
        </div>
      </footer>
    )
  }
}

export default Footer
