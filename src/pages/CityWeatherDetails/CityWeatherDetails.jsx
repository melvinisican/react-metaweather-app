import React, { Component } from 'react'
import { get } from 'lodash'

import WeatherForecast from '../../components/WeatherForecast'

const url = 'https://www.metaweather.com/api/location/'

class CityWeatherDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
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
          cityWeather: jsonResponse,
          fiveDayForecast: this.getFiveDayForecast(jsonResponse),
        })
      }
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
    const { cityWeather, fiveDayForecast } = this.state

    // eslint-disable-next-line no-console
    console.log(this.state)
    return (
      <div>
        <p>{`5 Day Foreacast for ${get(cityWeather, ['title'])}`}</p>
        <WeatherForecast data={fiveDayForecast} />
      </div>
    )
  }
}

export default CityWeatherDetails
