import React, { Component } from 'react'

class CityWeatherDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cityWeather: {},
      fiveDayForecast: [],
    }
  }

  render() {
    // eslint-disable-next-line no-console
    console.log(this.state)
    return (
      <div>
        <p>5 Day Foreacast for</p>
      </div>
    )
  }
}

export default CityWeatherDetails
