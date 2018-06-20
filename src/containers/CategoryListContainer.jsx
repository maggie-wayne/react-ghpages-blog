import React, { Component } from 'react'
import { connect } from 'react-redux'
import Category from '../components/Category'
import { loadDirOrFileByPath } from '../redux/modules/directories'

class CategoryListContainer extends Component {
    componentWillMount () {
        const { loadDirOrFileByPath, config } = this.props
        loadDirOrFileByPath(config.postsDir)
    }

    render () {
        const { categoryList } = this.props
        const list = (
            <ul className="category-list-container clearfix">
                {
                    categoryList.map(item => <Category category={ item } key={ item.sha }/>)
                }
            </ul>
        )
        return list
    }
}

const maptStateToProps = (state, ownProps) => {
    const { items, loading } = state.directories
    return {
        config: state.config,
        categoryList: items,
        loading
    }
}

export default connect(
    maptStateToProps,
    {
        loadDirOrFileByPath
    }
)(CategoryListContainer)