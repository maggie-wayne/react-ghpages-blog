import { CALL_API } from '../middleware/api'
import { arr2KeyValue } from '../../utils'

/**
 * Actions
 */
export const ISSUE_FETCH_REQUEST = 'ISSUE_FETCH_REQUEST'
export const ISSUE_FETCH_SUCCESS = 'ISSUE_FETCH_SUCCESS'
export const ISSUE_FETCH_FAILURE = 'ISSUE_FETCH_FAILURE'

export const ISSUE_CREATE_REQUEST = 'ISSUE_CREATE_REQUEST'
export const ISSUE_CREATE_SUCCESS = 'ISSUE_CREATE_SUCCESS'
export const ISSUE_CREATE_FAILURE = 'ISSUE_CREATE_FAILURE'

const initalState = {
    items: [],
    loading: true
}

/**
 * Redecer
 */
export default (state = initalState, action) => {
    let { type, response } = action
    switch (type) {
        case ISSUE_CREATE_REQUEST:
        case ISSUE_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ISSUE_CREATE_SUCCESS:
        case ISSUE_FETCH_SUCCESS:
            return {
                items: {
                    ...state.items,
                    ...arr2KeyValue(response, 'title')
                },
                loading: false
            }

        default:
            return state
    }
}

/**
 * Action creator
 */
const fetchIssues = params => ({
    [CALL_API]: {
        types: [ISSUE_FETCH_REQUEST, ISSUE_FETCH_SUCCESS, ISSUE_FETCH_FAILURE],
        ...params
    }
})

const issueCreateCreator = params => ({
    [CALL_API]: {
        types: [ISSUE_CREATE_REQUEST, ISSUE_CREATE_SUCCESS, ISSUE_CREATE_FAILURE],
        ...params
    }
})

/**
 * 获取 Issues
 * @param {string} query 
 */
export const loadIssues = () => (dispatch, getState) => {
    const { config: {owner, repo}, issues, content } = getState()
    if(content.fileName in issues.items) return

    const params = {
        url: `https://api.github.com/repos/${owner}/${repo}/issues`,
        method: 'GET',
        cache: false
    }

    return dispatch(
        fetchIssues(params)
    )
}

/**
 * 创建 Issues
 * @param {String} title 
 * @param {String} url 
 */
export const createIssue = (title, url) => (dispatch, getState) => {
    const { owner, repo } = getState().config

    const params = {
        url: `/repos/${owner}/${repo}/issues`,
        method: 'POST',
        params: {
            title,
            body: `Article address: ${url}`
        },
        cache: false,
    }

    return dispatch(
        issueCreateCreator(params)
    )
} 