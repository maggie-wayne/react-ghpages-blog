import React from 'react'
import PropTypes from 'prop-types'
import PostsItem from './PostsItem'
import { getDateStr } from '../utils'

const PostsList = ({ list }) => {
    const postsList = (
        <ol className="posts-list">
            {
                list.slice()
                    .sort((postsA, postsB) => {
                        const dateA = new Date(getDateStr(postsA.name)).getTime()
                        const dateB = new Date(getDateStr(postsB.name)).getTime()
                        return dateB - dateA
                    })
                    .map(file => <PostsItem file={ file } key={ file.sha } />)
            }
        </ol>
    )
    
    return list.length ? postsList : <div>Nothing ...</div>
}

PostsList.propTypes = {
    list: PropTypes.array.isRequired
}

export default PostsList