import React, { Component } from 'react'
import { debounce } from 'lodash'

import Card from '../../components/Card'
import Loading from '../../components/Loading'
import SearchInput from '../../components/SearchInput'
import QueryCityResults from '../../components/QueryCityResults'

import './styles.scss'

const url = 'https://www.metaweather.com/api/location/'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      noQuery: true,
      query: '',
      citiesResult: [],
      isLoading: false,
      fetchFailed: false,
    }
    this.debounceCitySearch = debounce(this.handleCitySearchQueryInput, 1000)
  }

  formatCityQueryResults = data => {
    /**
     * location sample
     * {
     *  latt_long: "37.777119, -122.41964"
     *  location_type: "City"
     *  title: "San Francisco"
     *  woeid: 2487956
     * }
     */
    return data.map(item => ({
      label: item.title,
      data: item,
    }))
  }

  handleChangeCityQueryInput = event => {
    this.setState(
      {
        query: event.target.value,
        isLoading: true,
        noQuery: event.target.value === '',
      },
      () => {
        this.debounceCitySearch(this.state.query)
      }
    )
  }

  handleCitySearchQueryInput = async () => {
    const urlWithQuery = `https://cors-anywhere.herokuapp.com/${url}search/?query=${this.state.query}`
    try {
      const response = await fetch(urlWithQuery)
      if (response.ok) {
        const jsonResponse = await response.json()
        this.setState({
          isLoading: false,
          citiesResult: this.formatCityQueryResults(jsonResponse),
        })
      } else if (this.state.query === '') {
        this.setState({
          isLoading: false,
          citiesResult: [],
          noQuery: true,
        })
      } else {
        this.setState({
          isLoading: false,
          citiesResult: [],
          fetchFailed: true,
        })
      }

      if (response.statusText === 'Forbidden') {
        // eslint-disable-next-line no-unused-expressions
        this.state.query === '' &&
          this.setState({
            isLoading: false,
            citiesResult: [],
          })
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  render() {
    const { citiesResult, isLoading, query, fetchFailed, noQuery } = this.state
    return (
      <div className="app">
        <div className="container">
          <Card>
            <h2 className="title">Simple Weather Application</h2>
            <hr />
            <div>
              <p className="label">Enter a City Name</p>
              <SearchInput
                name="cityInput"
                onChange={this.handleChangeCityQueryInput}
                value={query}
              />
            </div>
            <div>
              {isLoading ? (
                <Loading />
              ) : (
                <QueryCityResults
                  data={citiesResult}
                  error={fetchFailed}
                  query={query}
                  noQuery={noQuery}
                />
              )}
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default App
