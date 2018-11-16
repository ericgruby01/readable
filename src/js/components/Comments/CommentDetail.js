import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import { thunks as commentThunks, actions as commentActions } from '../../actions/comments';

// Illustration
import commentThumb from '../../../images/comments.svg';

// Components
import RatingButtons from '../RatingButtons';
import LoggedUser from '../LoggedUser';

class CommentDetail extends Component {
    /**
     * @method submitEditedComment
     * @description Update the comment
     */
    submitEditedComment = e => {
        const { handleUpdateComment, comment } = this.props;
        e.preventDefault();
        let editedComment = this.editComment.value.trim();
        if (editedComment === '') return;
        editedComment = {
            body: editedComment,
            timestamp: Date.now()
        }
        handleUpdateComment(comment.id, editedComment);
    }

    /**
     * @method componentWillUpdate
     * @description Lifecycle method
     * @param {Object} newProps 
     */
    componentWillUpdate (newProps) {
        // Just put focus on the editing textarea
        if (newProps.comment.isEditing) {
            setTimeout(() => this.editComment.focus(), 10);
        }
    }

    /**
     * @method render
     * @description Lifecycle method
     */
    render() {
        // Props
        const {
            comment,
            handleVoteComment,
            handleToggleCommentStatus,
            toggleCommentEditing
        } = this.props;

        // Comment
        const { body, timestamp, author, id, voteScore } = comment;

        // Date handler
        const getDate = new Date(timestamp).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false});
        return (
            <div className="comment-detail">
            <p className="comment-thumb btn-secondary-complementary--gradient"><img src={commentThumb} className="z-index-1" alt={author}/></p>
            <p className="comment-meta-data">
                <span className="meta"><span className="lnr lnr-user"></span> {author}</span>
                <span className="meta"><span className="lnr lnr-calendar-full"></span> {getDate}</span>
            </p>
            {comment.isEditing ? (
                <div className="form-group">
                    <textarea className="form-control" ref={editComment => this.editComment = editComment} defaultValue={body}></textarea>
                    <div className="mt-3">
                        <button className="btn btn-secondary-complementary--gradient mr-2" onClick={this.submitEditedComment}><span>Save Comment <span className="lnr lnr-checkmark-circle"></span></span></button>
                        <button className="btn btn-link text-danger" onClick={() => toggleCommentEditing(comment.id, false)} ><span>Cancel <span className="lnr lnr-cross-circle"></span></span></button>
                    </div>
                </div>
            ) : (
                <p className="comment-body" onDoubleClick={() => toggleCommentEditing(comment.id, !comment.isEditing)}>{body}</p>
            )}
            <div className="mb-0 comment-options">
                <LoggedUser user={comment.author}>
                    <div>
                        <span className="cursor-pointer mr-3" onClick={() => toggleCommentEditing(comment.id, !comment.isEditing)}>EDIT <span className="lnr lnr-pencil"></span></span>
                        <span className="cursor-pointer" onClick={() => handleToggleCommentStatus(comment)}>DELETE <span className="lnr lnr-trash"></span></span>
                    </div>
                </LoggedUser>
                <RatingButtons className="comment-rating" score={voteScore} onVote={option => handleVoteComment(id, option)}/>
            </div>
        </div>
        )
    }
}

/**
 * @function mapDispatchToProps
 */
const mapDispatchToProps = dispatch => bindActionCreators({
    ...commentThunks,
    toggleCommentEditing: commentActions.toggleCommentEditing
}, dispatch);

export default connect(null, mapDispatchToProps)(CommentDetail);