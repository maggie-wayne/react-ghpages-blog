import React from 'react'
import PropTypes from 'prop-types'
import CommentItem from './CommentItem'

const CommentList = ({ comments }) => {
    return (
        <ul className="comment-list">
            {
                comments.map(item => <CommentItem comment={ item } key={ item.id }/>)
            }
        </ul>
    )
}

CommentList.propTypes = {
    comments: PropTypes.array.isRequired
}

export default CommentList