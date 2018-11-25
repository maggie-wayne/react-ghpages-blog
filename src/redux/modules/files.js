import { apiActionCreator } from '../middleware/api'
import { DIR_FETCH_SUCCESS, loadDirOrFileByPath } from './directories'

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
    let { type, response, cacheKey } = action
    switch (type) {
        case FILE_FETCH_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FILE_FETCH_SUCCESS:
            response = filterDraft(response.items)
            return {
                items: {
                    ...state.items,
                    [cacheKey]: response
                },
                loading: false
            }

        case DIR_FETCH_SUCCESS:
            response = response.filter(x => x.type === 'file')
            response = filterDraft(response)
            return {
                items: {
                    ...state.items,
                    [cacheKey]: response
                },
                loading: false
            }
        default:
            return state
    }
}

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
const filterDraft = list => list.filter(x => !x.name.startsWith('[draft]'))

/**
 * 搜索 'md' 文件
 * @param {string} query 
 */
const loadFileBySearch = (query = '') => (dispatch, getState) => {
    const { config: { owner, repo }, files: {items} } = getState()

    const cacheKey = query || '/'
    if (cacheKey in items) return

    const option = {
        query,
        type: 'code',
        extension: 'md',
        repo: `${owner}/${repo}`
    }

    const api = {
        url: generateSearchUrl(option),
        method: 'GET',
        cache: true
    }
    const types = [FILE_FETCH_REQUEST, FILE_FETCH_SUCCESS, FILE_FETCH_FAILURE]
    const payload = { cacheKey }

    return dispatch(
        apiActionCreator(api, types, payload)
    )
}

export const loadFiles = (path) => (dispatch, getState) => {
    if (path) {
        dispatch(loadDirOrFileByPath(path))
    } else {
        dispatch(loadFileBySearch())
    }
}
