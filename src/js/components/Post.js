import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';

// Global helpers
import { truncate } from '../utils/GlobalHelpers';

// Actions
import { thunks as thunkPosts } from '../actions/posts';
import { thunks as commentsThunks } from '../actions/comments';

// Components
import PostMetadata from './PostMetadata';
import RatingButtons from './RatingButtons';

class Post extends Component {
     /**
     * @method componentDidMount
     * @description Lifecycle method
     */
    componentDidMount() {
        const {isSingle, post, handleGetComments} = this.props;
        if(isSingle) {
            handleGetComments(post.id)
        }
    }

     /**
     * @method render
     * @description Lifecycle method
     */
    render() {
        const { post, isSingle, handleVotePost, handleFavoritePost } = this.props;

        // Date handling
        const getDate = new Date(post.timestamp).toLocaleDateString();
        const formatedDate = getDate.split('/');
        const month = new Date(post.timestamp).toLocaleString('en-US', { month: 'short' });
        
        return (
            <div id={`post-${post.id}`} className='post box'>
                <div className="post-date text-light bg-primary--gradient">
                    <div className="z-index-1">
                        <div className="d">{formatedDate[0]}</div>
                        <div className="m">{month.toUpperCase()}</div>
                        <div className="y">{formatedDate[2]}</div>
                    </div>
                </div>
                
                <div className="post-header">
                    <h5 className="category">
                        <span className="float-right favorite">
                            {post.isFavorite ? (
                                <span className="lnr lnr-star cursor-pointer" onClick={() => handleFavoritePost(post.id)}></span>
                            ) : (
                                <span className="lnr lnr-star-empty text-muted cursor-pointer" onClick={() => handleFavoritePost(post.id)}></span>
                            )}
                        </span>
                        <Link to={`/${post.category}`} className="badge badge-complementary text-capitalize">{post.category}</Link>
                    </h5>
                    <div className="title">
                        {isSingle ? post.title : <Link to={`/${post.category}/${post.id}`}>{post.title}</Link>}
                    </div>
                    <PostMetadata post={post} />
                </div>
                <div className="post-body">
                    {isSingle ? <ReactMarkdown source={post.body} /> : truncate(post.excerpt, 140)}
                </div>
                <div className="post-footer">
                    <RatingButtons score={post.voteScore} className="post-rating" onVote={option => handleVotePost(post.id, option)}/>
                    {!isSingle && (
                        <div className="read-more">
                            <Link to={`/${post.category}/${post.id}`} className="btn bg-primary--gradient text-light"><span>Read More</span> <span className="lnr lnr-arrow-right"></span></Link>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

/**
 * @function mapDispatchToProps
 * @param {Function} dispatch
 */
const mapDispatchToProps = dispatch => bindActionCreators({ ...thunkPosts, ...commentsThunks }, dispatch);

export default connect(null, mapDispatchToProps)(Post);