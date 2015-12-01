import { createStore } from 'redux'

const videos = {
  videos: [ { id: 1, name: " Setting up your environment" },
            { id: 2, name: " Writing our first component" } ]
}

const videoStore = (state = videos, action) => {
  switch (action.type) {
  default:
    return state
  }
}

export default createStore(videoStore)
