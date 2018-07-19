import { isType } from '../../utils'
import axios from '../../plugins/axios'

export const CALL_API = 'CALL_API'

/**
 * callapi 中间件
 */
export default store => next => action => {
    const callAPI = action[CALL_API]    

    // 判断是否为 callAPI action
    if (isType(callAPI, 'undefined')) {
        return next(action)
    }

    const { url, method, cache, types } = callAPI
    // 参数检查
    if (!isType(url, 'string')) {
        throw new Error('URL must is a string.')
    }
    if (!isType(method, 'string')) {
        throw new Error('Method must is a string.')
    }
    if (!(isType(types, 'array') && types.length === 3)) {
        throw new Error('Expected an array of three action types.')
    }
    if (!types.every(type => isType(type, 'string'))) {
        throw new Error('Expected action types to be strings.')
    }
    if (!isType(cache, 'boolean')) {
        throw new Error('Expected action cache to be boolean.')
    }

    // 生成最终的Action
    const actionWith = data => {
        const finalAction = {...action, ...data}
        delete finalAction[CALL_API]
        return finalAction
    }
    
    // dispatch request action
    const [request, success, failure] = types
    next(actionWith({ type: request, isFetching: true }))

    // send request
    return axios(callAPI).then(
        response => {
            next(actionWith({
                response,
                type: success,
                isFetching: false
            }))
            return response
        },
        error => next(actionWith({
            type: failure,
            isFetching: false,
            error: error.message || 'Something bad happened.'
        }))
    )
}