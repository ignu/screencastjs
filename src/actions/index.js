import fetch from 'isomorphic-fetch'

export const REQUEST_VIDEOS = 'REQUEST_VIDEOS'
export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS'


function requestVideos() {
  return {
    type: REQUEST_VIDEOS
  }
}

function receiveVideos(json) {
  return {
    type: RECEIVE_VIDEOS,
    videos: json
  }
}

export default function fetchVideos() {
  return dispatch => {
    dispatch(requestVideos())
    return fetch(`./api/videos`)
      .then(response => response.json())
      .then(json => dispatch(receiveVideos(json)))
  }
}
