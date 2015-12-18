// history.js
import createBrowserHistory from 'history/lib/createBrowserHistory'

let rv = {}

if(process.env.npm_lifecycle_event != "test") rv = createBrowserHistory()

export default rv
