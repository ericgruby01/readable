import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

// Action
import { actions as actionsSidebar } from '../../actions/sidebar';

// Components
import Header from '../Header';
import MainStructure from '../MainStructure';
import Form from '../Form';


class PostForm extends Component {
    componentDidMount() {
        this.props.switchSidebar('edit');
    }
    render() {
        const { post } = this.props;
        return post.deleted ? (
            <Redirect to="/" />
        ) : (
            <DocumentTitle title={post.id ? `Editing post: ${post.title}` : "Write a new post"}>
                <Fragment>
                    <Header subtitle={post.id ? `Editing post: ${post.title}` : "Share your knoledge! Write a new post for us :)"} />
                    <MainStructure content={<Form post={post} />} post={post} />
                </Fragment>
            </DocumentTitle>
        )
    }
}

/**
 * @function mapStateToProps
 * @param {Object} State 
 * @param {Object} Props Component's own props
 */
const mapStateToProps = ({ posts }, { match }) => !match ? ({ post: false }) : ({ post: {...posts[match.params.id]} });

/**
 * @function mapDispatchToProps
 * @param {Function} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ ...actionsSidebar }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);