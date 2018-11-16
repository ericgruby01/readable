import {
    getComments,
    addComment,
    voteOnComment,
    editComment,
    deleteComment
} from '../utils/api';

import { actions as postActions } from './posts';

// Consts
export const consts = {
    SET_COMMENTS: 'SET_COMMENTS',
    ADD_COMMENT: 'ADD_COMMENT',
    VOTE_COMMENT: 'VOTE_COMMENT',
    UPDATE_COMMENT: 'UPDATE_COMMENT',
    TOGGLE_COMMENT_STATUS: 'TOGGLE_COMMENT_STATUS',
    TOGGLE_COMMENT_EDITING: 'TOGGLE_COMMENT_EDITING',
}

// Actions
export const actions = {
    /**
     * @function setComments
     * @description  Action | Get the comments from API and add them to store
     * @param {Array} comments
     */
    setComments: comments => ({ type: consts.SET_COMMENTS, comments }),
    
    /**
     * @function addComment
     * @description  Action | Add a new comment
     * @param {Object} comment
     */
    addComment: comment => ({ type: consts.ADD_COMMENT, comment }),
    
    /**
     * @function voteComment
     * @description  Action | Vote on a comment
     * @param {String} id Comment id
     * @param {String} option 'upVote' or 'downVote'
     */
    voteComment: (id, option)  => ({ type: consts.VOTE_COMMENT, id, option }),
    
    /**
     * @function updateComment
     * @description  Action | Update a comment
     * @param {String} id
     * @param {Object} Comment {comment: 'String', timestamp }
     */
    updateComment: (id, comment) => ({ type: consts.UPDATE_COMMENT, id, comment }),
    
    /**
     * @function toggleCommentStatus
     * @description  Action | Toggle the 'deleted' property on a comment
     * @param {String} id Comment id
     * @param {Boolean} status
     */
    toggleCommentStatus: (id, status) => ({ type: consts.TOGGLE_COMMENT_STATUS, id, status }),
    
    /**
     * @function toggleCommentEditing
     * @description  Action | Toggle the 'isEditing' property on a comment
     * @param {String} id
     * @param {Boolean} status
     */
    toggleCommentEditing: (id, status) => ({ type: consts.TOGGLE_COMMENT_EDITING, id, status })
}


// Thunks
export const thunks = {
    /**
     * @function handleGetComments
     * @description Thunk | 
     * @param {} postId
     */
    handleGetComments: postId => dispatch => {
        getComments(postId)
            .then(comments => dispatch(actions.setComments(comments.data)))
    },

    /**
     * @function handleAddComment
     * @description Thunk | Add a comment to the store and to the API
     * @param {Object} comment
     */
    handleAddComment: comment => dispatch => {
        dispatch(actions.addComment(comment));
        dispatch(postActions.updateCommentCount(comment.parentId, 'up'));
        addComment(comment);
    },

    /**
     * @function handleVoteComment
     * @description Thunk | Increase/decrease votes on a comment
     * @param {String} id Comment id
     * @param {String} option 'upVote' or 'downVote' 
     */
    handleVoteComment: (id, option) => dispatch => {
        dispatch(actions.voteComment(id, option));
        voteOnComment(id, option);
    },

    /**
     * @function handleUpdateComment
     * @description Thunk | Update comment
     * @param {String} id Comment id
     * @param {String} comment 
     */
    handleUpdateComment: (id, comment) => dispatch => {
        dispatch(actions.updateComment(id, comment));
        dispatch(actions.toggleCommentEditing(id, false));
        editComment(id, comment);
    },

    /**
     * @function handleToggleCommentStatus
     * @description Thunk | Toggle the 'deleted' property on a comment
     * @param {Object} comment
     */
    handleToggleCommentStatus: (comment, status = true) => dispatch => {
        dispatch(actions.toggleCommentStatus(comment.id, status));
        dispatch(postActions.updateCommentCount(comment.parentId, 'down'));
        deleteComment(comment.id);
    }
}