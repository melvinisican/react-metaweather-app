import React from 'react'
import { isEmpty } from 'lodash'

import './styles.scss'

const formatDate = date => {
  const d = new Date(date)
  let month = `${d.getMonth() + 1}`
  let day = `${d.getDate()}`
  const year = d.getFullYear()

  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`

  return [year, month, day].join('-')
}

const formatTemperatureLabel = text => `${parseFloat(text).toFixed(2)}\xB0C.`

const WeatherForecast = props => {
  const { data } = props
  return (
    <div className="table">
      <table>
        <tbody>
          {!isEmpty(data) &&
            data.map(weather => {
              return (
                <tr key={formatDate(weather.applicable_date)}>
                  <td>
                    <p className="weather-state-alt">
                      {formatDate(weather.applicable_date)}
                    </p>
                    <p className="weather-state">
                      {weather.weather_state_name}
                    </p>
                  </td>
                  <td>
                    <p className="weather-state text-center">
                      {formatTemperatureLabel(weather.min_temp)}
                    </p>
                    <p className="weather-state-alt text-center">Min</p>
                  </td>
                  <td>
                    <p className="weather-state text-center">
                      {formatTemperatureLabel(weather.max_temp)}
                    </p>
                    <p className="weather-state-alt text-center">Max</p>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default WeatherForecast
