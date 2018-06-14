import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostsContent from '../components/PostsContent'
import { loadFileDetail } from '../redux/modules/content'


class PostsContentContainer extends Component {

    componentWillMount () {
        const { loadUrl, loadFileDetail } = this.props
        loadFileDetail(loadUrl)
    }
    
    render () {
        const { content } = this.props
        const { loading } = content
        return loading ? <div>Loading ...</div> : <PostsContent content={ content }/>
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