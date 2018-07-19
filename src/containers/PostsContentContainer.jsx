import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommentContainer from './CommentContainer'
import PostsContent from '../components/PostsContent'
import { loadFileDetail, deleteContent } from '../redux/modules/content'

class PostsContentContainer extends Component {

    componentWillMount () {
        const { loadUrl, loadFileDetail } = this.props
        loadFileDetail(loadUrl)
    }

    componentWillUnmount() {
        this.props.deleteContent()
    }

    render () {
        const { content, showComment } = this.props
        const { loading, fileName } = content
        
        const postsBody = (
            <div>
                <PostsContent file={ content } />
                { showComment && <CommentContainer fileName={ fileName }/> }
            </div>
        )

        return loading ? <div>Loading ...</div> : postsBody
    }
}

const mapStateToProps = (state, ownProps) => {
   return {
       showComment: state.config.comment,
       loadUrl: ownProps.match.params[0] + '.md',
       content: state.content
   }
}

export default connect(
    mapStateToProps,
    {
        loadFileDetail,
        deleteContent
    }
)(PostsContentContainer)