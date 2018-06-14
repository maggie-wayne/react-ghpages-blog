import React from 'react'

const FooterBar = () => {
    const years = new Date().getFullYear()
    return (
        <div className="footer">
            Copyright © { years } | 
            Powered by
            &nbsp;&nbsp;
            <a
                href="https://github.com/zowiegong/react-ghpages-blog"
                rel="noopener noreferrer"
                target="_blank"
            >
                react-ghpages-blog
            </a>
        </div>
    )
}

export default FooterBar