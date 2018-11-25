import { apiActionCreator } from '../middleware/api'

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
    let { type, response } = action
    switch (type) {
        case DIR_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DIR_FETCH_SUCCESS:
            response = response.filter(x => x.type === 'dir')
            response = state.items.concat(response)
            return {
                items: response,
                loading: false
            }
        default:
            return state
    }
}

/**
 * 获取目录
 * @param {String} path 
 */
export const loadDirOrFileByPath =  (path = '') => (dispatch, getState) => {
    const { owner, repo } = getState().config

    const api = {
        url: `/repos/${owner}/${repo}/contents/${path}`,
        method: 'GET',
        cache: true
    }
    const types = [DIR_FETCH_REQUEST, DIR_FETCH_SUCCESS, DIR_FETCH_FAILURE]
    const payload = { cacheKey: path }
    
    return dispatch(
        apiActionCreator(api, types, payload)
    )
}
