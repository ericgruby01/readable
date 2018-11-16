import React from 'react';
import { connect } from 'react-redux';

// Components
import CommentsForm from './Comments/CommentsForm';
import CommentsList from './Comments/CommentsList';

const Comments = ({ id, loggedUser }) => (
    <div id="comments" className="box mb-3">
        <h4>Comments</h4>
        <p>Logged as <strong>{loggedUser}</strong></p>
        <CommentsForm id={id} />
        <hr className="py-3"/>
        <CommentsList id={id} />
    </div>
)

/**
 * @function mapStateToProps
 * @param {Object} State
 */
const mapStateToProps = ({ loggedUser }) => ({ loggedUser });

export default connect(mapStateToProps)(Comments);