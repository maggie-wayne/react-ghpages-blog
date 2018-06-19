import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { getTitle, getDateStr } from '../utils'


const Posts = ({ file }) => {
    const { sha, name, path } = file
    const title = getTitle(name)
    const postsDate = getDateStr(name)

    return (
        <li className="posts-item">
            <Link
                className="posts-title"
                to={{
                    pathname: '/' + path,
                    state: { sha }
                }}
            >
                { title }
            </Link>
            <time className="posts-date">
                { postsDate }
            </time>
        </li>
    )
}

Posts.propTypes = {
    file: PropTypes.object.isRequired
}

export default Posts