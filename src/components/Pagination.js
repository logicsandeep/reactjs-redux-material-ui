import React, { Component } from 'react'

import IconButton from 'material-ui/IconButton'
import FontIcon from 'material-ui/FontIcon'
import NavigationLeft from 'material-ui/svg-icons/navigation/chevron-left'
import NavigationRight from 'material-ui/svg-icons/navigation/chevron-right'

const styleNvgBtn = {
  display: 'inline-block'
}

export default class Pagination extends Component {
  render() {
    let prev_pages = [], next_pages = []
    for (let i = 1; i > 0 && i < this.props.currPage; i++)
      prev_pages.push(this.getFontIconButton(i))
    for (let i =this.props.currPage + 1; i <= this.props.totalPages; i++)
      next_pages.push(this.getFontIconButton(i))
    return(
      <div>
        <div className='col icon-btn'>
          <IconButton
            disabled={!(this.props.currPage - 1 > 0)}
            onClick={() => this.props.setPage(this.props.currPage - 1)}
          >
            <NavigationLeft />
          </IconButton>
        </div>
        { prev_pages }
        { this.getFontIconButton(this.props.currPage, true) }
        { next_pages }
        <div className='col icon-btn'>
          <IconButton
            disabled={!(this.props.currPage + 1 <= this.props.totalPages)}
            onClick={() => this.props.setPage(this.props.currPage + 1)}
          >
          <NavigationRight />
          </IconButton>
        </div>
      </div>
    )
  }
  getFontIconButton(i, current = false) {
    return (
      <IconButton key={i}
        disabled={current}
        onClick={() => this.props.setPage(i)}
      >
        { this.getFontIcon(i) }
      </IconButton>
    )
  }
  getFontIcon(i) {
    return (
      <FontIcon className='material-icons' style={{fontSize: 36}}>
        { i }
      </FontIcon>
    )
  }
}
