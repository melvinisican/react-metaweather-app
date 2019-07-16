import React from 'react'
import './styles.scss'

const ScrollView = props => {
  return (
    <div className="card">
      <div className="row">
        <div className="col-xs-1 col-md-1 col-lg-1">
          {props.leftButton && props.leftButton}
        </div>
        <div className="col-xs col-md col-lg">{props.children}</div>
      </div>
    </div>
  )
}

export default ScrollView
