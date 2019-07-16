import React from 'react'
import { Link } from 'react-router-dom'
import { kebabCase } from 'lodash'

import List from '../List'
import ScrollView from '../ScrollView'

const CitiesResultListItem = props => {
  // eslint-disable-next-line no-console
  console.log(kebabCase(props.label))
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
  return (
    <ScrollView>
      <List data={props.data} renderItem={CitiesResultListItem} />
    </ScrollView>
  )
}

export default QueryCityResults
