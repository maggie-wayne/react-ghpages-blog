import React from 'react'
import { getTitle, getDateStr } from '../utils'

const PostsContent = ({ content }) => {
    const { html, fileName } = content
    const title = getTitle(fileName)
    const postsDate = getDateStr(fileName).toLocaleString()

    document.title = title

    return (
        <div className="posts-content-container">
            <h1 className="posts-title">
                { title }
                <time className="posts-date">{ postsDate }</time>
            </h1>
            <div className="posts-content" dangerouslySetInnerHTML={ {__html: html} } />
        </div>
    )
}

export default PostsContent