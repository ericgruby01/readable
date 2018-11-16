import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

const CategoriesList = ({ counter, categories }) => (
    <div className="form-group">
        <small className="muted mb-2 d-block font-bold"><span className="lnr lnr-tag"></span> CATEGORIES</small>
        <ul className="list">
          <li><NavLink exact to='/'>All Categories</NavLink ></li>
          {Object.values(categories).map(category => (
              <li key={category.path}><NavLink className="text-capitalize" to={`/${category.path}`}>{category.name} <span className="badge badge-complementary ml-2">{counter[category.path]}</span></NavLink></li>
          ))}
        </ul>
    </div>
)

/**
 * @function mapStateToProps
 * @param {Object} state 
 */
function mapStateToProps({categories, posts}) {
  const counter = Object.keys(categories).reduce((count, category) => {
    count[category] = Object.values(posts).filter(post => !post.deleted && (category === post.category)).length;
    return count;
  }, {});

  return {
    categories,
    counter
  }
}

export default connect(mapStateToProps)(CategoriesList);