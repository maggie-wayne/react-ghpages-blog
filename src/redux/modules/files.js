import { CALL_API } from '../middleware/api'
import { DIR_FETCH_SUCCESS } from './directories'

/**
 * Actions
 */
export const FILE_FETCH_REQUEST = 'FILE_FETCH_REQUEST'
export const FILE_FETCH_SUCCESS = 'FILE_FETCH_SUCCESS'
export const FILE_FETCH_FAILURE = 'FILE_FETCH_FAILURE'

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
        case FILE_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FILE_FETCH_SUCCESS:
            return {
                items: response.items,
                loading: false
            }
        case DIR_FETCH_SUCCESS:
            return {
                items: response.filter(x => x.type === 'file'),
                loading: false
            }
        default:
            return state
    }
}

/**
 * Action creator
 */
const fetchFileList = params => ({
    [CALL_API]: {
        types: [FILE_FETCH_REQUEST, FILE_FETCH_SUCCESS, FILE_FETCH_FAILURE],
        ...params
    }
})

const generateSearchUrl = option => {
    const { query, type } = option

    delete option.type
    delete option.query

    const optionStr = Object.keys(option).reduce(
        (str, key) => (str += `+${key}:${option[key]}`),
        `q=${query || ''}`
    )

    return `/search/${type}?${optionStr}`
}

export const loadFileBySearch = (query = '') => (dispatch, getState) => {
    const { owner, repo } = getState().config
    const option = {
        query,
        type: 'code',
        extension: 'md',
        repo: `${owner}/${repo}`
    }
    const params = {
        url: generateSearchUrl(option),
        method: 'GET',
        cache: true
    }

    return dispatch(
        fetchFileList(params)
    )
}
