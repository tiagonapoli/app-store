import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

class Footer extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
  }

  translate = id => this.props.intl.formatMessage({ id: `dreamstore.${id}` })

  render() {
    const year = new Date().getFullYear()
    return (
      <footer className="w-100 bottom-0 pa7 pa9-l bg-serious-black flex items-center white">
        <div className="tc mh2">&copy; {year}</div>
        <div className="cf tc flex items-center justify-center">
          VTEX Extension Store
        </div>
      </footer>
    )
  }
}

export default injectIntl(Footer)
