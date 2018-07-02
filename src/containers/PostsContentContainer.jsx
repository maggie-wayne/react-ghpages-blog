import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostsContent from '../components/PostsContent'
import CommentsContainer from './CommentsContainer'
import { loadFileDetail } from '../redux/modules/content'


class PostsContentContainer extends Component {

    componentWillMount () {
        const { loadUrl, loadFileDetail } = this.props
        loadFileDetail(loadUrl)
    }
    
    render () {
        const { content, loadUrl } = this.props
        const { loading } = content

        const postsBody = (
            <div>
                <PostsContent content={ content } location={ { pathname: '/posts' } }/>
                <CommentsContainer repo='zowiegong/blog' postsUrl={ loadUrl }/>
            </div>
        )

        return loading ? <div>Loading ...</div> : postsBody
    }
}

const mapStateToProps = (state, ownProps) => {
   return {
       loadUrl: ownProps.match.params[0] + '.md',
       content: state.content
   }
}

export default connect(
    mapStateToProps,
    {
        loadFileDetail
    }
)(PostsContentContainer)