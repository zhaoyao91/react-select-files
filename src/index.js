import React from 'react'
import ReactDOM from 'react-dom'

let fileSelector = null

function selectFiles (options) {
  return fileSelector.selectFiles(options)
}

class FilesSelector extends React.Component {
  state = {
    inputOptions: {}
  }

  componentDidMount () {
    fileSelector = this
  }

  render () {
    return <input {...this.state.inputOptions} onChange={this.onChange.bind(this)} type="file" ref="input"
                  style={{display: 'none'}} value=""/>
  }

  onChange (e) {
    const files = e.target.files
    this._resolve([...files])
    this._resolve = null
  }

  selectFiles (options = {}) {
    return new Promise((resolve, reject) => {
      this.setState({inputOptions: options})
      this._resolve = resolve
      setTimeout(() => this.refs.input.click(), 0)
    })
  }
}

let initialized = false

export default function withSelectFiles (name) {
  if (!initialized) {
    const container = document.createElement('div')
    container.id = 'react-files-selector-container'
    document.body.appendChild(container)
    ReactDOM.render(<FilesSelector/>, container)
    initialized = true
  }

  return function hoc (Component) {
    return function (props) {
      return <Component {...{[name]: selectFiles}} {...props}/>
    }
  }
}
