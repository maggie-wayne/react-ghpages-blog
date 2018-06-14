import React from 'react'
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

export default Category