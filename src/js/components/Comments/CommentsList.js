import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Illustration
import comment from '../../../images/comments.svg';

// Actions
import { thunks as commentThunks } from '../../actions/comments';

// Components
import CommentDetail from './CommentDetail';
import IllustrationSpace from '../IllustrationSpace'

class CommentsList extends Component {

    render() {
        const { comments } = this.props;
        return (
            <div className="all-comments">
                {comments.length > 0 ? (
                    <div className="comments-list">
                        <TransitionGroup>
                            {comments
                                .sort((a, b) => b.timestamp - a.timestamp)
                                .map(comment => (
                                    <CSSTransition key={comment.id} timeout={250} classNames="fade-up">
                                        <CommentDetail comment={comment} onRemove={this.props.onRemove} onVote={this.props.onVote} />
                                    </CSSTransition>
                                ))}
                        </TransitionGroup>
                    </div>
                ) : (
                    <IllustrationSpace illustration={comment} altText="Be the first to comment" title="No comments yet." description="Go ahead and be the first!" />
                )}
            </div>
        )
    }
}

/**
 * @function mapStateToProps
 * @param {Object} state 
 */
const mapStateToProps = ({ comments }, { id }) => {
    const filteredComments = Object.values(comments).filter(comment => (!comment.deleted && id === comment.parentId))
    return {
        comments: filteredComments
    }
};

/**
 * @function mapDispatchToProps
 * @param {Function} dispatch
 */
const mapDispatchToProps = dispatch => bindActionCreators({ ...commentThunks }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);