/**
 * 对字符串进行 hash
 * @param {string} str 
 */
export const hashCode = (str) => {
    if (!str) return ''
    let [len, hash, i, chr] = [(str.length), 0, null, null]
    if (len === 0) return hash
    for (i = 0 ; i < len; i++) {
        chr = str.charCodeAt(i)
        hash = ((hash << 5) - hash) + chr
        hash |= 0 // Convert to 32bit integer
    }
    return hash
}

/**
 * get title from file name
 * @param {string} fileName
 * @returns {string}
 */
export const getTitle = (fileName) => {
    return fileName.replace(/\.md$/, '')
        .replace(/^\d{4}-\d{1,2}-\d{1,2}-/, '')
        .replace(/_/g, ' ')
}

/**
 * get publish date from file name
 * @param {string} fileName
 * @returns {string}
 */
export const getDateStr = fileName => /^\d{4}-\d{1,2}-\d{1,2}/.exec(fileName)[0]

/**
 * 首字母大写
 * @param {string} string 
 * @return {string}
 */
export const capitalizeFirstLetter = string => string.charAt(0).toUpperCase() + string.slice(1)

/**
 * 类型判断
 * @param {any} source 
 */
const getType = source => Object.prototype.toString.call(source)

/**
 * 类型判断
 * @param {any} source 
 * @param {string} type 
 * @return {boolean}
 */
export const isType = (source, type) => {
    const typeMap = {
        string:     '[object String]',
        number:     '[object Number]',
        array:      '[object Array]',
        boolean:    '[object Boolean]',
        function:   '[object Function]',
        object:     '[object Object]',
        null:       '[object Null]',
        undefined:  '[object Undefined]',
        symbol:     '[object Symbol]'
    }

    if (getType(type) !== typeMap.string) {
        throw new Error('Type must is a string.')
    }
    
    type = type.toLocaleLowerCase()
    if (!(type in typeMap)) {
        throw new Error('Unexpected type.')
    }

    return getType(source) === typeMap[type]
}

export const arr2KeyValue = (arr, key, cb) => {
    if (!isType(arr, 'array') && !isType(arr, 'object')) return {}
    arr = isType(arr, 'object') ? [arr] : arr

    if(arr.length === 0) return {}

    return arr.reduce((o, item) => {
        if(cb) {
            o[cb(item[key])] = item
        } else {
            o[item[key]] = item
        }
        return o
    }, {})
}