import nprogress from 'nprogress'
import { queue } from '../../plugins/axios'

export let isLoding = {
    status: false
}

export default store => next => action => {
    let { isFetching, error } = action
    
    if (
        (isLoding.status && !isFetching && queue.length === 0) || 
        error
    ) {
        nprogress.done()
        isLoding.status = false
    } else if(!isLoding.status && isFetching) {
        nprogress.start()
        isLoding.status = true
    } else if (isLoding.status) {
        nprogress.inc()
    }
    next(action)
}