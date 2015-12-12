import fetch from 'isomorphic-fetch'

export const SAVING_USER = 'SAVING_USER'
export const SAVED_USER = 'SAVED_USER'
export const ERROR = 'ERROR'

function submitPost() {
  return {
    type: SAVING_USER
  }
}

function postComplete(json) {
  console.log("User Saved...", json)
  return {
    type: SAVED_USER
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
    if(errors.length) { return dispatch(errorsFor(errors))}

    dispatch(submitPost())
    return fetch(`./api/users`, { method: "POST"})
      .then(response => response.json())
      .then(json => dispatch(postComplete(json)))
  }
}
