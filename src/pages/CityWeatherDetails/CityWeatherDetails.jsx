import React, { Component } from 'react'
import { get } from 'lodash'

import Card from '../../components/Card'
import Loading from '../../components/Loading'
import WeatherForecast from '../../components/WeatherForecast'

const url = 'https://www.metaweather.com/api/location/'

class CityWeatherDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      cityWeather: {},
      fiveDayForecast: [],
    }
  }

  componentDidMount() {
    this.handleFetchCityWeatherForecast()
  }

  handleFetchCityWeatherForecast = async () => {
    /**
     * consolidated weather sample
     * {
     *  consolidated_weather: (6) [{…}, {…}, {…}, {…}, {…}, {…}]
     *  latt_long: "37.777119, -122.41964"
     *  location_type: "City"
     *  parent: {title: "California", location_type: "Region / State ...}
     *  sources: (7) [{…}, {…}, {…}, {…}, {…}, {…}, {…}]
     *  sun_rise: "2019-07-15T05:59:43.222002-07:00"
     *  sun_set: "2019-07-15T20:31:46.671610-07:00"
     *  time: "2019-07-15T07:01:22.163203-07:00"
     *  timezone: "US/Pacific"
     *  timezone_name: "LMT"
     *  title: "San Francisco"
     *  woeid: 2487956
     * }
     */

    const woeid = get(this.props, ['location', 'item', 'data', 'woeid'])

    const urlWithQuery = `https://cors-anywhere.herokuapp.com/${url}${woeid}`
    try {
      const response = await fetch(urlWithQuery)
      if (response.ok) {
        const jsonResponse = await response.json()
        this.setState({
          isLoading: true,
          cityWeather: jsonResponse,
          fiveDayForecast: this.getFiveDayForecast(jsonResponse),
        })
      } else {
        this.setState({ fetchError: true })
      }
      this.setState({ isLoading: false })
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }

  getFiveDayForecast = data => {
    const consolidatedWeather = get(data, ['consolidated_weather'])

    return consolidatedWeather.slice(0, 5)
  }

  render() {
    const { isLoading, cityWeather, fiveDayForecast, fetchError } = this.state

    return (
      <div className="container">
        <Card>
          {isLoading ? (
            <div>
              <Loading />
              <p>Fetching Weather Data</p>
            </div>
          ) : (
            <div>
              <h2 className="title">Simple Weather Application</h2>
              <hr />
              <h4 className="description">
                {`5 Day Foreacast for ${get(cityWeather, ['title'])}`}
              </h4>
              <WeatherForecast data={fiveDayForecast} />
              {fetchError ? (
                <p>Something went wrong while fetching. Try Again</p>
              ) : null}
            </div>
          )}
        </Card>
      </div>
    )
  }
}

export default CityWeatherDetails
