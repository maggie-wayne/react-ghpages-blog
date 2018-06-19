import { CALL_API } from '../middleware/api'

/**
 * Actions
 */
export const DIR_FETCH_REQUEST = 'DIR_FETCH_REQUEST'
export const DIR_FETCH_SUCCESS = 'DIR_FETCH_SUCCESS'
export const DIR_FETCH_FAILURE = 'DIR_FETCH_FAILURE'

const initalState = {
    items: [],
    loading: true
}

/**
 * Redecer
 */
export default (state = initalState, action) => {
    const { type, response } = action
    switch (type) {
        case DIR_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DIR_FETCH_SUCCESS:
            return {
                items: state.items.concat(response.filter(x => x.type === 'dir')),
                loading: false
            }
        default:
            return state
    }
}

/**
 * Action creator
 */
const fetchDir = params => ({
    [CALL_API]: {
        types: [DIR_FETCH_REQUEST, DIR_FETCH_SUCCESS, DIR_FETCH_FAILURE],
        ...params
    }
})

export const loadDirOrFileByPath =  (path = '') => (dispatch, getState) => {
    path = path === '/' ? '' : path
    const { owner, repo } = getState().config

    const params = {
        url: `/repos/${owner}/${repo}/contents/${path}`,
        method: 'GET',
        cache: true
    }

    return dispatch(
        fetchDir(params)
    )
}
