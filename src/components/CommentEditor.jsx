import React from 'react'

const CommentEditor = ({ value, user, login, logout, submit, change }) => {
    const signIn = <button onClick={login}>Sign in</button>

    const submitBtn = <button onClick={submit}>Submit</button>

    const userEl = (
        <div className="user">
            <span>{user && user.login}</span>
            &nbsp;
            <button onClick={logout}>Sign out</button>
        </div>
    )

    
    return (
        <div className="comment-editor">
            { user && userEl }
            <div className="input">
                <textarea disabled={!user} value={value} onChange={change} name="comment-value" ></textarea>
                { user ? submitBtn : signIn }
            </div>
        </div>
    )
}

export default CommentEditor