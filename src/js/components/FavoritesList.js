import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const FavoritesList = ({ favorites }) => (
    <div className="form-group">
        <small className="muted mb-2 d-block font-bold"><span className="lnr lnr-star"></span> FAVORITES</small>
        <ul className="list">
            <TransitionGroup>
                {favorites.length === 0 && (
                    <CSSTransition key="favorites-tip" timeout={250} classNames="fade-up">
                        <li className="text-muted">
                            No favorites yet. Click on the <span className="lnr lnr-star-empty"></span> to add a post to your favorites.
                        </li>
                    </CSSTransition>
                )}
                {favorites.map(favorite => (
                    <CSSTransition key={favorite.id} timeout={250} classNames="fade-up">
                        <li key={favorite.id}>
                            <NavLink to={`/${favorite.category}/${favorite.id}`}>{favorite.title}</NavLink>
                        </li>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    </div>
)

/**
 * @function mapStateToProps
 * @param {Object} State 
 */
const mapStateToProps = ({ posts }) => ({ favorites: Object.values(posts).filter(post => !post.deleted && post.isFavorite) });

export default connect(mapStateToProps)(FavoritesList);
