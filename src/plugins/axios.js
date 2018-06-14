import axios from 'axios'
import { camelizeKeys } from 'humps'
import localforage from '../plugins/cache'
import { hashCode } from '../utils'
import conf from '../config'

const instance = axios.create({
    baseURL: conf.baseURL,
    timeout: conf.requestTimeOut
})

instance.interceptors.response.use(response => response.data)

export let queue = []
const deleteUrlFromQueue = url => queue.splice(queue.indexOf(url), 1)

export default async callApi => {
    const url = callApi.url

    // 过滤重复请求
    if (queue.indexOf(url) !== -1) {
        return Promise.reject({
            message: 'Do not repeat requests.'
        })
    }
    queue.push(url)

    const { params, option, cache } = callApi
    const method = callApi.method.toLocaleLowerCase()
    let response = null

    // 是否缓存
    if (cache) {
        // 生成缓存的Key值
        let cacheKey = url
        params && (cacheKey += hashCode(JSON.stringify(params)))

        // 检查缓存
        const hasCache = await localforage.has(cacheKey)
        response = hasCache 
            ? await localforage.get(cacheKey)
            : await instance[method](url, params, option)
        // 写入缓存
        !hasCache && localforage.set(cacheKey, response)
    } else {
        response = await instance[method](url, params, option)
    }

    deleteUrlFromQueue(url)
    const camelizedJson = camelizeKeys(response)
    return camelizedJson
}