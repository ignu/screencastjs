import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const videos = {
  videos: [ { id: 1, name: " Setting up your environment (store)" },
            { id: 2, name: " Writing our first component (store)" } ]
}

const videoStore = (state = videos, action) => {
  switch (action.type) {
  case "RECEIVE_VIDEOS" :
    return Object.assign({}, state, { videos: action.videos })
  default:
    return state
  }
}

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

export default createStoreWithMiddleware(videoStore)
