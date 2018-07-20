import { apiActionCreator } from '../middleware/api'
import { hashCode } from '../../utils'

/**
 * Actions
 */
export const FILE_DETAIL_REQUEST = 'FILE_DETAIL_REQUEST'
export const FILE_DETAIL_FAILURE = 'FILE_DETAIL_FAILURE'
export const FILE_DETAIL_SUCCESS = 'FILE_DETAIL_SUCCESS'

export const DELETE_FILE_DETAIL = 'DELETE_FILE_DETAIL'

const initalState = {
    items: {},
    loading: true
}

/**
 * Redecer
 */
export default (state = initalState, action) => {
    const { type, response, path } = action
    switch (type) {
        case FILE_DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FILE_DETAIL_SUCCESS:
            const cacheKey = hashCode(path)
            return {
                items: {
                    [cacheKey]: {
                        ...(state.items[cacheKey] || {}),
                        fileName: path.split('/').slice(-1)[0],
                        html: response
                    }
                },
                loading: false
            }
       
        default:
            return state
    }
}

export const loadFileDetail = path => (dispatch, getState) => {
    const { config: { owner, repo, branch }, contents: { items } } = getState()

    const cacheKey = hashCode(path)
    if (cacheKey in items) return

    const payload = { path }
    const types = [FILE_DETAIL_REQUEST, FILE_DETAIL_SUCCESS, FILE_DETAIL_FAILURE]
    const api = {
        url: `/repos/${owner}/${repo}/contents/${path}`,
        ref: branch,
        method: 'GET',
        cache: true,
        option: {
            headers: {
                'Accept': 'application/vnd.github.3.html+json'
            }
        }
    }

    return dispatch(
        apiActionCreator(api, types, payload)
    )
}