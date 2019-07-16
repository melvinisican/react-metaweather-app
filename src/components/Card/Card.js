import React from 'react'
import './styles.scss'

const ScrollView = props => {
  return (
    <div className="card">
      <div className="row center-xs center-md center-lg">
        <div className="col-xs col-md col-lg">{props.children}</div>
      </div>
    </div>
  )
}

export default ScrollView
