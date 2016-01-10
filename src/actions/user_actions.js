import fetchIso from 'isomorphic-fetch'
import history from '../history'

export const SAVING_USER = 'SAVING_USER'
export const LOGGED_IN_USER = 'LOGGED_IN_USER'
export const SAVED_USER = 'SAVED_USER'
export const ERROR = 'ERROR'
export const LOGOUT = 'LOGOUT'
export const CANCEL = 'CANCEL'
export const RECEIVE_STRIPE_TOKEN = 'RECEIVE_STRIPE_TOKEN'

function submitPost() {
  return {
    type: SAVING_USER
  }
}

let fetch = (url, body) => {
  return fetchIso(`./api/login`, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body
  })
}

function loginComplete(json) {
  return {
    type: LOGGED_IN_USER,
    userId: json.uid,
    token: json.token
  }
}

function postComplete(json) {
  return {
    type: SAVED_USER,
    userId: json.id
  }
}

function errorsFor(errors) {
  return {
    type: ERROR,
    errors: errors
  }
}

let validateUser = (user) => {
  let errors = []
  if (!user.email) errors.push("Email required")
  if (!user.password) errors.push("Password required")
  return errors
}

export function logout() {
  return {type: LOGOUT}
}

export function cancel() {
  return dispatch => {
    dispatch({ type: CANCEL })
    let promise = fetch("/api/cancel", {})

    promise.then((body) =>{
      dispatch({ type: "FINISHED_CANCEL" })
      history.replaceState(null, '/')
    })
  }
}

export function loginUser(user) {
  return dispatch => {
    let errors = validateUser(user);
    if(errors.length) { return dispatch(errorsFor(errors)) }

    // waiting for save and login isn't really different.
    // is this sitll okay?
    // TODO: DRY this up if this pattern is okay.
    dispatch(submitPost())

    let promise = fetch(`./api/login`, JSON.stringify(user))

    promise.then(response => response.json())

    return promise.then((json) => {
        if (json.error) {
          switch(json.error.code) {
          case "INVALID_USER":
            return dispatch(errorsFor([`No user with email ${user.email} could be found`]))
          case "INVALID_PASSWORD":
            return dispatch(errorsFor(["Password is incorrect."]))
          default:
            return dispatch(errorsFor([json.error.code]))
          }
        }
        else {
          dispatch(loginComplete(json))
          history.replaceState(null, '/')
        }
      })
  }
}

export function addStripeInfo(data) {
  return {
    type: RECEIVE_STRIPE_TOKEN,
    stripeInfo: data
  }
}

export function saveUser(user) {
  return dispatch => {
    let errors = validateUser(user);
    if(errors.length) { return dispatch(errorsFor(errors)) }

    dispatch(submitPost())

    return fetch(`./api/users`, JSON.stringify(user))
      .then(response => response.json())
      .then((json) => {
        if (json.error) {
          switch(json.error.code) {
          case "EMAIL_TAKEN":
            return dispatch(errorsFor(["This email is already in use."]))
          default:
            return dispatch(errorsFor([json.error.code]))
          }
        }
        else {
          dispatch(postComplete(json))
          history.replaceState(null, '/')
        }
      })
  }
}
