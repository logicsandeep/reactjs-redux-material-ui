import {
  GITHUB_REPOS_LOAD_REQUEST,
  GITHUB_REPOS_LOAD_SUCCESS,
  GITHUB_REPOS_LOAD_ERROR
} from '../constants'

const initialState = {
  data: [],
  fetching: false,
  error: false
}

export default function app(state = initialState, action) {
  switch (action.type) {
    case GITHUB_REPOS_LOAD_REQUEST:
      return {...state, fetching: true}
    case GITHUB_REPOS_LOAD_SUCCESS:
      return {...state, data: action.payload, fetching: false}
    case GITHUB_REPOS_LOAD_ERROR:
      return {...state, fetching: false, error: action.payload}
    default:
      return state
  }
}
