import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AutoComplete from 'material-ui/AutoComplete'
import CircularProgress from 'material-ui/CircularProgress'
import IconButton from 'material-ui/IconButton'
import EditorModeEdit from 'material-ui/svg-icons/editor/mode-edit'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn
} from 'material-ui/Table'

import Header from './Header'
import Pagination from './Pagination'
import { loadDatabaseList } from '../actions/app'

const styleTable = {
  id: {width: '10%'},
  name: {width: '15%'},
  description: {width: '65%'}
}

class App extends Component {
  state = {
    acValue: '',
    dataset: [],
    currPage: 1,
    onPage: 10,
    totalPages: 1
  }

  componentWillMount() {
    this.props.loadDatabaseList()
  }
  componentWillReceiveProps(props) {
    let dataset = props.app.data
    if (this.state.acValue.trim())
      dataset = dataset.filter(item => this.filter(this.state.acValue, item.name))

    this.setState({
      totalPages: Math.ceil(props.app.data.length / this.state.onPage),
      dataset
    })
  }

  filter(value, key) {
    return key.toLowerCase().indexOf(value.toLowerCase()) !== -1
  }
  onACChange(acValue) {
    if (!acValue.trim())
      this.setState({
        dataset: this.props.app.data,
        acValue,
        currPage: 1,
        totalPages: Math.ceil(this.props.app.data.length / this.state.onPage)
      })
    else {
      let dataset = this.props.app.data.filter(item => this.filter(acValue, item.name))
      this.setState({
        dataset,
        acValue,
        currPage: 1,
        totalPages: Math.ceil(dataset.length / this.state.onPage)
      })
    }
  }


  render() {
    let data = this.state.dataset
    if (data)
      data = data.slice(
        ((this.state.currPage - 1) * this.state.onPage),
        (this.state.currPage * this.state.onPage)
      )
    return (
      <MuiThemeProvider>
        <div>
          <div className='row'>
            <Header />
            <br />
            <br />
            <br />
            <div className='col left'>
              <AutoComplete
                hintText='Enter name'
                searchText={this.state.searchText}
                onUpdateInput={::this.onACChange}
                dataSource={data}
                dataSourceConfig={{ text: 'name', value: 'id'}}
                filter={::this.filter}
                openOnFocus={true}
              />
            </div>
            <div className='col right'>
              {this.state.totalPages > 1 && <Pagination
                currPage={this.state.currPage}
                totalPages={this.state.totalPages}
                setPage={(page) => this.setState({currPage: page})}
              />}
            </div>
          </div>
          {!this.props.app.fetching
            ? this.getTable(data)
            :  <CircularProgress />}
        </div>
      </MuiThemeProvider>
    )
  }
  getTable(data) {
    return (
      <Table
        selectable={false}
      >
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn style={styleTable.id}>
              Id
            </TableHeaderColumn>
            <TableHeaderColumn style={styleTable.name}>
              Name
            </TableHeaderColumn>
            <TableHeaderColumn style={styleTable.description}>
              Description
            </TableHeaderColumn>
            <TableHeaderColumn></TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          displayRowCheckbox={false}
          showRowHover={true}
        >
        { data.map((item, i) => (
          <TableRow key={i}>
            <TableRowColumn style={styleTable.id}>
              { item.id }
            </TableRowColumn>
            <TableRowColumn style={styleTable.name}>
              { item.name }
            </TableRowColumn>
            <TableRowColumn style={styleTable.description}>
              { item.description }
            </TableRowColumn>
            <TableRowColumn>
              <IconButton>
                <EditorModeEdit />
              </IconButton>
              <IconButton>
                <ActionDelete />
              </IconButton>
            </TableRowColumn>
          </TableRow>
        ))}
        </TableBody>
      </Table>
    )
  }
}

function mapStateToProps(state) {
  return {
    app: state.rootReducer.app
  }
}
function mapDispatchToProps(dispatch) {
  return {
    loadDatabaseList: bindActionCreators(loadDatabaseList, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
