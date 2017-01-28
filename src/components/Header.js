import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import IconButton from 'material-ui/IconButton'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'

import { redirect } from '../actions/app'
import {
  ROUTE_APP,
  ROUTE_TEST1,
  ROUTE_TEST2
} from '../constants'

const routes = [
  { text: 'Page App', route: ROUTE_APP},
  { text: 'Page Test1', route: ROUTE_TEST1},
  { text: 'Page Test2', route: ROUTE_TEST2},
]

class Header extends Component {
  state = {
    openDrawer: false
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
        <IconButton
          label='Open Drawer'
          onClick={() => this.setState({openDrawer: true})}
        >
          <NavigationMenu />
        </IconButton>
        <Drawer
          docked={false}
          width={200}
          open={this.state.openDrawer}
          onRequestChange={open => this.setState({openDrawer: open})}
        >
          { routes.map((item, i) => (
            <MenuItem key={i} onClick={() => this.props.redirect(item.route)}>
              { item.text }
            </MenuItem>
          ))}
        </Drawer>
        </div>
      </MuiThemeProvider>
    )
  }
}
function mapStateToProps(state) {
  return {
  }
}
function mapDispatchToProps(dispatch) {
  return {
    redirect: bindActionCreators(redirect, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
