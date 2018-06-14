import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadFileBySearch } from '../redux/modules/files'
import { loadDirOrFileByPath } from '../redux/modules/directories'

import PostsList from '../components/PostsList'

class PostsListContainer extends Component {
    componentWillMount () {
        this.getData(this.props)
    }

    componentWillReceiveProps (nextProps) {
        const loadUrl = this.props.loadUrl
        const nextUrl = nextProps.loadUrl
        if (loadUrl !== nextUrl) {
            this.getData(nextProps)
        }
    }

    getData (props) {
        const { loadUrl, loadFileBySearch, loadDirOrFileByPath } = props
        if (loadUrl === '') {
            loadFileBySearch()
        } else {
            loadDirOrFileByPath(loadUrl)
        }
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
    return {
        loadUrl: ownProps.match.params[0],
        postsList: items,
        loading
    }
}

export default withRouter(
    connect(
        mapStateToProps,
        {
            loadFileBySearch,
            loadDirOrFileByPath
        }
    )(PostsListContainer)
)