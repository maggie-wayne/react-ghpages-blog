import localforage from 'localforage'
import conf from '../config'

let isInit = false

/**
 * get data from cache
 * @param {string} key 
 */
const get = key => localforage.getItem(key)

/**
 * save data to cache
 * @param {string} key 
 * @param {any} value 
 */
const set = (key, value) => localforage.setItem(key, value)

/**
 * check cache has key
 * @param {string} key 
 * @returns {boolean}
 */
const has = async key => {
    const keys = await localforage.keys()
    return keys.indexOf(key) !== -1
}

/**
 * inital localforage
 */
const inital = async (repoInfo) => {
    if (isInit) return isInit
    
    const version = new Date(repoInfo.updatedAt).getTime()
    localforage.config({
        name: conf.repo,
        storeName: version.toString()
    })
    isInit = true
    return isInit
}

export default {
    isInit,
    inital,
    get,
    set,
    has
}