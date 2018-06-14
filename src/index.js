import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import nprogress from 'nprogress'

import App from './App.jsx'
import store from './redux'
import cache from './plugins/cache'
import { loadRepo } from './redux/modules/repo'
import { isLoding } from './redux/middleware/loding'

import './style/nprogress.less'

nprogress.start()
isLoding.status = true

store.dispatch(loadRepo())
    .then(cache.inital)
    .then(() => {
        render(
            <Provider store={store}>
                <App />
            </Provider>,
            document.getElementById('root')
        )
    })