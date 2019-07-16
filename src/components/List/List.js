import React from 'react'
import './styles.scss'

const ListItem = props => {
  const { renderItem } = props
  const { label } = props.item

  return <li>{renderItem ? renderItem(props.item) : label}</li>
}

const List = props => {
  const { data, renderItem } = props

  return (
    <ul className="list">
      {data.map(item => {
        return <ListItem key={item.label} item={item} renderItem={renderItem} />
      })}
    </ul>
  )
}

export default List
