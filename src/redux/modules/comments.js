import { apiActionCreator } from '../middleware/api'
import uniqby from 'lodash.uniqby'
import { hashCode } from '../../utils'

/**
 * Actions
 */
export const COMMENT_FETCH_REQUEST = 'COMMENT_FETCH_REQUEST'
export const COMMENT_FETCH_SUCCESS = 'COMMENT_FETCH_SUCCESS'
export const COMMENT_FETCH_FAILURE = 'COMMENT_FETCH_FAILURE'

export const COMMENT_CREATE_REQUEST = 'COMMENT_CREATE_REQUEST'
export const COMMENT_CREATE_SUCCESS = 'COMMENT_CREATE_SUCCESS'
export const COMMENT_CREATE_FAILURE = 'COMMENT_CREATE_FAILURE'

const initalState = {
    items: {},
    loading: true
}

/**
 * Redecer
 */
export default (state = initalState, action) => {
    let { type, response, issueNum } = action
    switch (type) {
        case COMMENT_FETCH_REQUEST:
        case COMMENT_CREATE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case COMMENT_CREATE_SUCCESS:
        case COMMENT_FETCH_SUCCESS:
            response = Array.isArray(response) ? response : [response]
            response = (state.items[issueNum] || []).concat(response)
            return {
                items: {
                    ...state.items,
                    [issueNum]: uniqby(response, x => x.id)
                },
                loading: false
            }

        default:
            return state
    }
}

/**
 * 生成请求参数
 * @param {*} owner 
 * @param {*} repo 
 * @param {*} issueNum 
 * @param {*} method 
 * @param {*} params 
 * 
 * 关于请求头
 * https://developer.github.com/v3/issues/comments/#comments
 * https://developer.github.com/v3/issues/comments/#reactions-summary
 */
const makeApi = (owner, repo, issueNum, method, params: {}) => ({
    url: `https://api.github.com/repos/${owner}/${repo}/issues/${issueNum}/comments`,
    method,
    params,
    cache: false,
    option: {
        headers: {
            'Accept': 'application/vnd.github.3.html+json,application/vnd.github.squirrel-girl-preview',
        }
    }
})

/**
 * 获取评论
 */
export const loadComments = fileName => (dispatch, getState) => {
    const { config: { owner, repo }, issues: { items } } = getState()
    const issueCackeKey = hashCode(fileName)
    const issue = items[issueCackeKey]
    const issueNum = issue && issue.number
    if (!issueNum) return

    const api = makeApi(owner, repo, issueNum, 'GET')
    const types = [COMMENT_FETCH_REQUEST, COMMENT_FETCH_SUCCESS, COMMENT_FETCH_FAILURE]
    const payload = { issueNum }

    return dispatch(
        apiActionCreator(api, types, payload)
    )
}

/**
 * 创建评论
 * @param {Number} issueNum 
 * @param {String} body 
 */
export const createComment = (issueNum, body) => (dispatch, getState) => {
    const { owner, repo } = getState().config

    const api = makeApi(owner, repo, issueNum, 'POST', { body })
    const types = [COMMENT_CREATE_REQUEST, COMMENT_CREATE_SUCCESS, COMMENT_CREATE_FAILURE]
    const payload = { issueNum }

    return dispatch(
        apiActionCreator(api, types, payload)
    )
}

