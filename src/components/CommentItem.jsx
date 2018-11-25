import React from 'react'
import PropTypes from 'prop-types'

const Comment = ({ comment }) => {
    const { user: { login, htmlUrl }, reactions, bodyHtml, createdAt, updatedAt,  } = comment

    const user = (
        <span className="comment-user">
            {/* <img className="comment-user-img" src={avatarUrl + '&s=26'} alt={login} href={htmlUrl}/> */}
            <a href={htmlUrl} target="_blank" rel="noopener noreferrer">
                { login }
            </a>
        </span>
    )

    const meta = (
        <span className="comment-meta">
            &nbsp;commented on&nbsp;
            <time>
                {
                    new Date(
                        createdAt === updatedAt ? createdAt : updatedAt
                    ).toLocaleString()
                }
            </time>
        </span>
    )

    const reactionsEl = (
        <div className="comment-reactions">
            {/* <span role="img" aria-label="+1">👍</span> { reactions['+1'] || '' }
            <span role="img" aria-label="-1">👎</span> { reactions['-1'] || '' }
            <span role="img" aria-label="laugh">😄</span> { reactions.laugh || '' }
            <span role="img" aria-label="hooray">🎉</span> { reactions.hooray || '' }
            <span role="img" aria-label="confuesd">😕</span> { reactions.confuesd || '' }
            <span role="img" aria-label="heart">❤️</span> { reactions.heart || '' } */}
            {/* <span>♡</span> { reactions.heart || '' } */}
        </div>
    )

    return (
        <li className="comment-item">
            <div>
                { user }
                { meta }
                { reactionsEl }
            </div>
           
            <div className="comment-body">
                <div className="markdown-body" dangerouslySetInnerHTML={ {__html: bodyHtml} } />
            </div>
        </li>
    )
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
}

export default Comment