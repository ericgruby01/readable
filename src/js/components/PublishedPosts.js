import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

const PublishedPosts = ({ publishedPosts }) => publishedPosts.length > 0 ? (
    <div className="form-group">
        <small className="muted mb-2 d-block font-bold"><span className="lnr lnr-list"></span> YOUR POSTS</small>
        <ul className="list">
            {publishedPosts.map(({id, category, title}) => <li key={id}><NavLink to={`/${category}/${id}`}>{title}</NavLink></li>)}
        </ul>
    </div>
) : (
    <div className="form-group">
        <small className="muted mb-2 d-block font-bold"><span className="lnr lnr-list"></span> YOUR POSTS</small>
        <p>You have no posts <span role="img" aria-label="sad">😞</span></p>
    </div>
);

/**
 * @function mapStateToProps
 * @param {Object} State 
 */
const mapStateToProps = ({ posts, loggedUser }) => {
    const publishedPosts = Object.values(posts).filter(post => !post.deleted && (post.author === loggedUser));
    return {
        publishedPosts 
    }
};

export default connect(mapStateToProps)(PublishedPosts);