import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// Actions
import { thunks as commentThunks } from '../../actions/comments';

// Global helpers
import { formaComment } from '../../utils/GlobalHelpers';

class CommentsForm extends Component {
    /**
     * @method submitComment
     * @description Add a comment
     */
    submitComment = e => {
        e.preventDefault();
        const { handleAddComment, loggedUser, id } = this.props;
        if (this.textarea.value.trim() === '') return;
        let comment = {
            body: this.textarea.value,
            author: loggedUser
        };
        this.textarea.value = '';
        handleAddComment(formaComment(comment, id));
    }

    /**
     * @method render
     * @description Lifecycle method.
     */
    render() {
        return (
            <form onSubmit={this.submitComment}>
                <div className="form-group">
                    <textarea ref={textarea => this.textarea = textarea} className="form-control" rows="5" placeholder="Comment..."></textarea>
                </div>
                <div className="input-group">
                    <button type="submit" className="ml-auto btn btn-secondary-complementary--gradient"><span>Comment <span className="lnr lnr-bubble"></span></span></button>
                </div>
            </form>
        )
    }
}

/**
 * @function mapStateToProps
 * @param {Object} State 
 */
const mapStateToProps = ({ loggedUser }) => ({ loggedUser });

/**
 * @function mapDispatchToProps
 */
const mapDispatchToProps = dispatch => bindActionCreators({ ...commentThunks }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CommentsForm);