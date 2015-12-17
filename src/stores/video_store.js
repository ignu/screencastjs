import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import Cookies from 'cookies-js'

const USER_ID = "iig"
const TOKEN = "tgn"

let cookiesEnabled = typeof Cookies.get === "function"

const defaultState = {
  loading: true,
  savingUser: false,
  errors: [],
  userId: cookiesEnabled ? Cookies.get(USER_ID) : undefined
}

let login = (userId, tokenId) => {
  console.log("userId, tokenId", userId, tokenId)
  if (!cookiesEnabled) return

  Cookies.set(USER_ID, userId)
  if (tokenId) Cookies.set(TOKEN, tokenId)
}

let logout = () => {
  Cookies.set(USER_ID, undefined)
  Cookies.set(TOKEN, undefined)
}

export const reducer = (state = defaultState, action = "DEFAULT") => {
  if (console.debug) console.debug("action ---> ", action)

  switch (action.type) {
  case "LOGOUT" :
    logout()
    return Object.assign({}, state, { userId: undefined })
  case "ERROR" :
    return Object.assign({}, state, { savingUser: false, errors: action.errors })
  case "LOGGED_IN_USER" :
    login(action.userId, action.token)
    return Object.assign({}, state, { savingUser: false, userId: action.userId })
  case "SAVING_USER" :
    return Object.assign({}, state, { savingUser: true, errors: [] })
  case "SAVED_USER" :
    login(action.userId)
    return Object.assign({}, state, { savingUser: false, userId: action.userId })
  case "RECEIVE_VIDEOS" :
    return Object.assign({}, state, { videos: action.videos, loading: false })
  default:
    return state
  }
}

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default createStoreWithMiddleware(reducer)
