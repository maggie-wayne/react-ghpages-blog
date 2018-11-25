import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import CategoryListContainer  from './CategoryListContainer'

class NavContainer extends Component {
    render () {
        const { title } = this.props.config
        return (
            <header className="header">
                <h1 className="blog-title">
                    <Link to="/">
                        { title }
                    </Link>
                </h1>
                <div>
                    
                </div>
                <CategoryListContainer />
            </header>
        )
    }
}

const mapStateToPropos = state => {
    return {
        config: state.config
    }
}

export default connect(
    mapStateToPropos
)(NavContainer)