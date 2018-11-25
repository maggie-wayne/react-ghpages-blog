import { createStore, combineReducers, applyMiddleware } from 'redux'

// middleware
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import api from './middleware/api'
import loding from './middleware/loding'

// reducer
import conf from '../config'
import files from './modules/files'
import directories from './modules/directories'
import repo from './modules/repo'
import contents from './modules/contents'
import issues from './modules/issues'
import comments from './modules/comments'

const reducers = combineReducers({
    config: () => conf,
    files,
    directories,    
    repo,
    contents,
    issues,
    comments
})
const middleware = [ thunk, api, loding ]

if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger())
}

export default createStore(
    reducers,
    applyMiddleware(...middleware)
)