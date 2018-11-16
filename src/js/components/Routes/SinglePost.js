import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';

// Illustration
import noPost from '../../../images/noPost.svg';

// Actions
import { actions as actionsSidebar } from '../../actions/sidebar';

// Components
import Header from '../Header';
import MainStructure from '../MainStructure';
import Post from '../Post';
import IllustrationSpace from '../IllustrationSpace';
import Comments from '../Comments';

class SinglePost extends Component {
    /**
     * @method componentDidMount
     * @description Lifecycle method
     */
    componentDidMount() {
        this.props.switchSidebar('single');
    }

    /**
     * @method render
     * @description Lifecycle method
     */
    render() {
        const {post} = this.props;
        return post.deleted ? (
            <Redirect to="/" />
        ) : (
            <DocumentTitle title={post.id ? `${post.title || 'Post'} - Readable` : 'Post not found - Readable'}>
                <Fragment>
                    {/* Header */}
                    <Header>{post.id ? `You're reading: ${post.title}` : <span>Post not found. <Link to="/" className="text-light"><u>Go to Homepage &rarr;</u></Link></span>}</Header>
                    {post.id ? (
                        <MainStructure content={<Fragment><Post post={post} isSingle /><Comments id={post.id} /></Fragment>} post={post} />
                    ) : (
                        <MainStructure content={
                            <IllustrationSpace
                                illustration={noPost}
                                altText="Post not found"
                                title="Post not found"
                                description="We don't think this post might exist :("/>
                            }
                        />
                    )}
                </Fragment>
            </DocumentTitle>
        )
    }
}

/**
 * @function mapStateToProps
 * @param {Object} State 
 */
const mapStateToProps = ({ posts }, {match}) => ({ posts, post: {...posts[match.params.id]} });

/**
 * @function mapDispatchToProps
 * @param {Function} dispatch
 */
const mapDispatchToProps = dispatch => bindActionCreators({ ...actionsSidebar }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);