import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadComments, createComment } from '../redux/modules/comments'
import { loadIssues, createIssue } from '../redux/modules/issues'
import OAuth from '../plugins/oauth'
import CommentList from '../components/CommentList'
import CommentEditor from '../components/CommentEditor'
import { hashCode } from '../utils'

class CommentContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            commentValue: ''
        }
    }

    async componentDidMount() {
        const { loadIssues, loadComments, fileName } = this.props
        let user = null

        try {
            user = JSON.parse(localStorage.getItem('user'))
        } catch(e) {
            user = null
        }
        this.setState({
            user
        })
        
        await loadIssues(fileName)
        await loadComments(fileName)
    }

    async createIssue() {
        const { fileName, createIssue } = this.props
        const title = fileName
        const url = window.location.href

        const issue = await createIssue(title, url)
        return issue
    }

    async createComment(issueNum, body) {
        const { createComment } = this.props
        await createComment(issueNum, body)
    }

    async login() {
        const user = await OAuth.login()
        this.setState({
            user
        })
    }

    async logout() {
        await OAuth.logout()
        this.setState({
            user: null
        })
    }

    async submit() {
        let { issueNum } = this.props
        const { user, commentValue } = this.state

        !user && await this.login()

        if(!issueNum) {
            const isCreateIssue = window.confirm('当前没有 Issues 是否需要创建?')
            if (isCreateIssue) {
                const issue = await this.createIssue()
                issueNum = issue.number
            }
        }
        
        if(issueNum) {
            await this.createComment(issueNum, commentValue)

            this.setState({
                commentValue: ''
            })
        }
    }

    onCommentChange(e) {
        this.setState({
            commentValue: e.target.value
        })
    }

    render () {
        const { comments } = this.props
        const { user, commentValue } = this.state
        const { login, logout, submit, onCommentChange } = this

        const commentEditorProps = {
            value: commentValue,
            user,
            login: login.bind(this),
            logout: logout.bind(this),
            submit: submit.bind(this),
            change: onCommentChange.bind(this)
        }

        const noComment = (
            <div className="oauth">
                暂无评论。
            </div>
        )

        return (
            <div className="comments">
                <div>
                    <div className="comments-title">
                        <h1>Comments</h1>
                    </div>
                    { comments ? <CommentList comments={ comments }/> : noComment }
                    <CommentEditor {...commentEditorProps} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    const fileName = ownProps.fileName
    const cacheKey = hashCode(fileName)
    const issue = state.issues.items[cacheKey] || null
    const issueNum = issue && issue.number
    return {
        fileName,
        issueNum,
        comments: issueNum && state.comments.items[issueNum]
    }
}

export default connect(
    mapStateToProps,
    {
        loadComments,
        createComment,
        loadIssues,
        createIssue
    }
)(CommentContainer)