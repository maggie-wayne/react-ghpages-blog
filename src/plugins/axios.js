import axios from 'axios'
import { camelizeKeys } from 'humps'
import localforage from '../plugins/cache'
import { hashCode } from '../utils'
import conf from '../config'

const instance = axios.create({
    baseURL: conf.baseURL,
    timeout: conf.requestTimeOut
})

instance.interceptors.request.use(options => {
    const accessToken = window.localStorage.getItem('access_token')
    if (accessToken) {
        options.headers['Authorization'] = ' token ' + accessToken
    }
    return options
})

instance.interceptors.response.use(response => response.data)

export let queue = []

/**
 * 从请求队列中删除url
 * @param {string} url 
 */
const deleteUrlFromQueue = url => queue.splice(queue.indexOf(url), 1)

/**
 * 生成缓存 key
 * @param {string} url 
 * @param {any} params 
 */
const makeCacheKey = (url, params) => url += params ? hashCode(JSON.stringify(params)) : ''

export default async config => {
    let response = null
    let { params, option, cache, url } = config
    const method = config.method.toLocaleLowerCase()
    const cacheKey = makeCacheKey(url, params)

    // 过滤重复请求
    if (queue.indexOf(cacheKey) !== -1) {
        return Promise.reject({
            message: 'Do not repeat requests.'
        })
    }
    queue.push(cacheKey)

    // 是否缓存
    if (cache) {
        // 检查缓存
        const hasCache = await localforage.has(cacheKey)
        response = hasCache 
            ? await localforage.get(cacheKey)
            : await instance[method](url, params, option)
        // 写入缓存
        !hasCache && localforage.set(cacheKey, response)
    } else {
        params = method === 'get' ? option : params
        response = await instance[method](url, params, option)
    }

    deleteUrlFromQueue(cacheKey)
    const camelizedJson = camelizeKeys(response)
    return camelizedJson
}