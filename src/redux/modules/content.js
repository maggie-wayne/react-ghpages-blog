import { CALL_API } from '../middleware/api'

/**
 * Actions
 */
export const FILE_DETAIL_REQUEST = 'FILE_DETAIL_REQUEST'
export const FILE_DETAIL_FAILURE = 'FILE_DETAIL_FAILURE'
export const FILE_DETAIL_SUCCESS = 'FILE_DETAIL_SUCCESS'

const initalState = {
    loading: true
}

/**
 * Redecer
 */
export default (state = initalState, action) => {
    const { type, response, fileName } = action
    switch (type) {
        case FILE_DETAIL_REQUEST:
            return {
                loading: true
            }
        case FILE_DETAIL_SUCCESS:
            return {
                html: response,
                loading: false,
                fileName
            }
        default:
            return state
    }
}

/**
 * Action creator
 */
const fetchFileDetail = (params, fileName) => ({
    fileName,
    [CALL_API]: {
        types: [FILE_DETAIL_REQUEST, FILE_DETAIL_SUCCESS, FILE_DETAIL_FAILURE],
        ...params
    }
})

export const loadFileDetail = path => (dispatch, getState) => {
    const { owner, repo, branch } = getState().config
    const level = path.split('/')
    const fileName = level[level.length - 1]

    const params = {
        url: `/repos/${owner}/${repo}/contents/${path}`,
        ref: branch,
        method: 'GET',
        cache: true,
        params: {
            headers: {
                'Accept': 'application/vnd.github.VERSION.html+json'
            }
        }
    }

    return dispatch(fetchFileDetail(params, fileName))
}