import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadFiles } from '../redux/modules/files'
import { title } from '../config'
import { capitalizeFirstLetter } from '../utils'

import PostsList from '../components/PostsList'

class PostsListContainer extends Component {
    componentWillMount () {
        this.getData(this.props)
        this.setTitle(this.props)
    }

    componentWillReceiveProps (nextProps) {
        const loadUrl = this.props.loadUrl
        const nextUrl = nextProps.loadUrl

        if (loadUrl !== nextUrl) {
            this.getData(nextProps)
            this.setTitle(nextProps)
        }
    }

    getData (props) {
        const { loadUrl, loadFiles } = props
        loadFiles(loadUrl)
    }

    setTitle (props) {
        const path = props.loadUrl.split('/')
        const level = path.length - 1
        const currentLocation = capitalizeFirstLetter(path[level])
        const pageTitle = currentLocation + (level ? ' - ' : '') + title
        document.title = pageTitle
    }

    render () {
        const { postsList, loading } = this.props

        return (
            <div className="posts-list-container">
                {
                    loading ? <div>Loding ...</div> : <PostsList list={ postsList } />
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const { items, loading } = state.files
    const loadUrl = ownProps.match.params[0]
    const cacheKey = loadUrl || '/'

    return {
        loadUrl,
        postsList: items[cacheKey] || [],
        loading
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        {
            loadFiles
        }
    )(PostsListContainer)
)