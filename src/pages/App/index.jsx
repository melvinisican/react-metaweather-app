import React, { Component } from 'react'

import SearchInput from '../../components/SearchInput'

import './styles.scss'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: 'san',
      citiesResult: [],
    }
  }

  render() {
    // eslint-disable-next-line no-console
    console.log(this.state)
    return (
      <div className="app">
        <SearchInput name="cityInput" value={this.state.query} />
      </div>
    )
  }
}

export default App
