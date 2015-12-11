import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const defaultState = {
  loading: true,
  savingUser: false
}

const videoStore = (state = defaultState, action) => {
  switch (action.type) {
  case "SAVING_USER" :
    return Object.assign({}, state, { savingUser: true })
  case "RECEIVE_VIDEOS" :
    return Object.assign({}, state, { videos: action.videos, loading: false })
  default:
    return state
  }
}

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

export default createStoreWithMiddleware(videoStore)
