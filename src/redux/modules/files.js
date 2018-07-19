import { CALL_API } from '../middleware/api'
import { DIR_FETCH_SUCCESS } from './directories'
import uniqby from 'lodash.uniqby'

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
    let { type, response } = action
    switch (type) {
        case FILE_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FILE_FETCH_SUCCESS:
            response = filterDraft(response.items)
            response = response.concat(state.items || [])
            return {
                items: uniqby(response, x => x.sha),
                loading: false
            }

        case DIR_FETCH_SUCCESS:
            response = response.filter(x => x.type === 'file')
            response = filterDraft(response)
            response = response.concat(state.items || [])
            return {
                items: uniqby(response, x => x.sha),
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

/**
 * 生成搜索 url
 * @param {Object} option 
 */
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

/**
 * 过滤草稿，文件名以 [draft] 开头
 * @param {Array} list 
 */
export const filterDraft = list => list.filter(x => !x.name.startsWith('[draft]'))

/**
 * 搜索 'md' 文件
 * @param {string} query 
 */
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
