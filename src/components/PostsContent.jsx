import React from 'react'
import PropTypes from 'prop-types'
import { getTitle, getDateStr } from '../utils'

const PostsContent = ({ file }) => {
    const { html, fileName } = file
    const title = getTitle(fileName)
    const postsDate = getDateStr(fileName)

    document.title = title

    return (
        <div className="posts-content-container">
            <h1>
                <span className="posts-title">{ title }</span>
                <time className="posts-date">{ postsDate }</time>
            </h1>
            <div className="posts-content" dangerouslySetInnerHTML={ {__html: html} } />
        </div>
    )
}

PostsContent.propTypes = {
    file: PropTypes.object.isRequired
}

export default PostsContent