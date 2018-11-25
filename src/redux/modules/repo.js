import { apiActionCreator } from '../middleware/api'

/**
 * Actions
 */
export const REPO_FETCH_REQUEST = 'REPO_FETCH_REQUEST'
export const REPO_FETCH_SUCCESS = 'REPO_FETCH_SUCCESS'
export const REPO_FETCH_FAILURE = 'REPO_FETCH_FAILURE'

const initalState = {
    loading: true
}

/**
 * Reducer
 */
export default (state = initalState, action) => {
    const { type, response } = action
    switch (type) {
        case REPO_FETCH_REQUEST:
            return {
                loading: true
            }
        case REPO_FETCH_SUCCESS:
            return {
                ...response,
                loading: false
            }
        default:
            return state
    }
}

/**
 * 获取仓库信息
 */
export const loadRepo = (dispatch, getState) => {
    const { owner, repo } = getState().config
    const api = {
        url: `/repos/${owner}/${repo}`,
        method: 'GET',
        cache: false
    }
    const types = [REPO_FETCH_REQUEST, REPO_FETCH_SUCCESS, REPO_FETCH_FAILURE]

    return dispatch(
        apiActionCreator(api, types)
    )
}