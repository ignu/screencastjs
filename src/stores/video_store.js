import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Cookies from 'cookies-js'

const USER_ID = "iig"

let cookiesEnabled = typeof Cookies.get === "function"

const defaultState = {
  loading: true,
  savingUser: false,
  errors: [],
  userId: cookiesEnabled ? Cookies.get(USER_ID) : undefined
}

export const reducer = (state = defaultState, action = "DEFAULT") => {
  if (console.debug) console.debug("action ---> ", action)

  switch (action.type) {
  case "ERROR" :
    return Object.assign({}, state, { savingUser: false, errors: action.errors })
  case "SAVING_USER" :
    return Object.assign({}, state, { savingUser: true, errors: [] })
  case "SAVED_USER" :
    if (cookiesEnabled) Cookies.set(USER_ID, action.userId)
    return Object.assign({}, state, { savingUser: false, userId: action.userId })
  case "RECEIVE_VIDEOS" :
    return Object.assign({}, state, { videos: action.videos, loading: false })
  default:
    return state
  }
}

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

export default createStoreWithMiddleware(reducer)
