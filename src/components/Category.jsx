import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Category = ({ category }) => {
    const { name, path } = category
    return (
        <li className="category-item">
            <Link
                className="category-name"
                to={ '/' + path }
            >
                { name }
            </Link>
        </li>
    )
}

Category.propTypes = {
    category: PropTypes.object.isRequired
}

export default Category