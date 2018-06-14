import { CALL_API } from '../middleware/api'

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
 * Action cretor
 */
const fetchRepo = params => ({
    [CALL_API]: {
        types: [REPO_FETCH_REQUEST, REPO_FETCH_SUCCESS, REPO_FETCH_FAILURE],
        ...params
    }
})

export const loadRepo = () => (dispatch, getState) => {
    const { owner, repo } = getState().config
    const params = {
        url: `/repos/${owner}/${repo}`,
        method: 'GET',
        cache: false
    }

    return dispatch(
        fetchRepo(params)
    )
}