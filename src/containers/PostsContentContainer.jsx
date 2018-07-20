import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentContainer from './CommentContainer'
import PostsContent from '../components/PostsContent'
import { loadFileDetail } from '../redux/modules/contents'
import { hashCode } from '../utils'

class PostsContentContainer extends Component {

    componentWillMount () {
        const { filePath, loadFileDetail } = this.props
        loadFileDetail(filePath)
    }

    render () {
        const { file, showComment, loading } = this.props
        
        const postsBody = file ? (
            <div>
                <PostsContent file={ file } />
                { showComment && <CommentContainer fileName={ file.fileName }/> }
            </div>
        ) : null

        return loading ? <div>Loading ...</div> : postsBody
    }
}

const mapStateToProps = (state, ownProps) => {
    const filePath = ownProps.match.params[0] + '.md'
    const cacheKey = hashCode(filePath)
    const file = state.contents.items[cacheKey] || null

    return {
        filePath,
        file,
        showComment: state.config.comment,
        loading: state.contents.loading,
    }
}

export default connect(
    mapStateToProps,
    {
        loadFileDetail
    }
)(PostsContentContainer)