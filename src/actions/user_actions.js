import fetch from 'isomorphic-fetch'
import history from '../history'

export const SAVING_USER = 'SAVING_USER'
export const SAVED_USER = 'SAVED_USER'
export const ERROR = 'ERROR'

function submitPost() {
  return {
    type: SAVING_USER
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

export default function saveUser(user) {
  return dispatch => {
    let errors = validateUser(user);
    if(errors.length) { return dispatch(errorsFor(errors)) }

    dispatch(submitPost())
    return fetch(`./api/users`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user) })
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
