import React from 'react'
import { Link } from 'react-router-dom'
import { kebabCase, isEmpty } from 'lodash'

import List from '../List'
import ScrollView from '../ScrollView'

import './styles.scss'

const CitiesResultListItem = props => {
  return (
    <Link
      to={{
        pathname: `/city/${kebabCase(props.label)}`,
        id: kebabCase(props.label),
        item: props,
      }}
      params={props}
    >
      {props.label}
    </Link>
  )
}

const QueryCityResults = props => {
  const { data, error, query, noQuery } = props
  return (
    <ScrollView>
      {!isEmpty(data) && <List data={data} renderItem={CitiesResultListItem} />}
      {isEmpty(data) && error ? (
        <div>
          <h4 className="description">
            Something went wrong while fetching, Try again
          </h4>
        </div>
      ) : (
        isEmpty(data) && (
          <div>
            <h4 className="description">
              {noQuery ? '' : `No Results for the search text "${query}"`}
            </h4>
          </div>
        )
      )}
    </ScrollView>
  )
}

export default QueryCityResults
