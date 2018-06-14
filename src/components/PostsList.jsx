import React from 'react'
import PostsItem from './PostsItem'

import { getDateStr } from '../utils'

const PostsList = ({ list }) => {
    const postsList = list
        .sort((postsA, postsB) => {
            const dateA = new Date(getDateStr(postsA.name)).getTime()
            const dateB = new Date(getDateStr(postsB.name)).getTime()
            return dateB - dateA
        })
        .map(file => <PostsItem file={ file } key={ file.sha } />)
    
    return list.length ? postsList : <div>Nothing ...</div>
}

export default PostsList