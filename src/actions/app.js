import { sprintf } from 'sprintf-js'
import { push } from 'react-router-redux'
import {
  GITHUB_FACEBOOK_URL_REPOS,
  GITHUB_REPOS_LOAD_REQUEST,
  GITHUB_REPOS_LOAD_SUCCESS,
  GITHUB_REPOS_LOAD_ERROR
} from '../constants'

export const loadDatabaseList = () => dispatch => {
  dispatch({
    type: GITHUB_REPOS_LOAD_REQUEST
  })
  const options = {
    method: 'GET',
  }
  fetch(GITHUB_FACEBOOK_URL_REPOS, options)
    .then(response => response.json())
    .then(result => {
      if (result.length)
        dispatch({type: GITHUB_REPOS_LOAD_SUCCESS, payload: result})
      else
        dispatch({type: GITHUB_REPOS_LOAD_ERROR, payload: 'Error to fetch'})
    })
    .catch(error => dispatch({type: GITHUB_REPOS_LOAD_ERROR, payload: error}))
}
export const redirect = (route) => dispatch => {
  dispatch(push(route))
}
