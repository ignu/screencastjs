import fetch from 'isomorphic-fetch'

export const SAVING_USER = 'SAVING_USER'

export default function saveUser() {
  return {
    type: SAVING_USER
  }
}
