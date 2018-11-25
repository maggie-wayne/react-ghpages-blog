import config from '../config'
import axios from '../plugins/axios'

const oauth = () => new Promise((resolve, reject) => {
    const token = localStorage.getItem('access_token')
    let needOauth = !token

    if (needOauth) {
        const { client_id, domain } = config
        const authUrl = 'https://github.com/login/oauth/authorize'
        const href = `${authUrl}?scope=public_repo&client_id=${client_id}&redirect_uri=${domain}/oauth.html`

        function storateChangeHandler (event) {
            if (event.key === 'access_token' && event.newValue) {
                resolve(event.newValue)
            } else {
                reject()
            }
            window.removeEventListener('storage', storateChangeHandler)
        }

        window.addEventListener('storage', storateChangeHandler)
        window.open(href)
    } else {
        resolve(token)
    }
})

const afterOAuth = () => axios({url: '/user', method: 'GET'})
    .then(result => {
        localStorage.setItem('user', JSON.stringify(result))
        return result
    })


const login = () => oauth().then(afterOAuth)

const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
}

export default {
    login,
    logout
}