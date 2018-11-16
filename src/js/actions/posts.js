import { voteOnPost, deletePost, publishPost, addPost, editPost, favoritePost } from '../utils/api';
import Snackbar from 'node-snackbar';

// Consts
export const consts = {
    RECEIVE_POSTS: 'RECEIVE_POSTS',
    VOTE_POST: 'VOTE_POST',
    ADD_POST: 'ADD_POST',
    UPDATE_POST: 'UPDATE_POST',
    TOGGLE_POST_STATUS: 'TOGGLE_POST_STATUS',
    TOGGLE_POST_FAVORITE: 'TOGGLE_POST_FAVORITE',
    UPDATE_COMMENT_COUNT: 'UPDATE_COMMENT_COUNT'
}

// Actions
export const actions = {
    receivePosts: (posts) => ({ type: consts.RECEIVE_POSTS, posts }),
    
    addPostToStore: (post) => ({ type: consts.ADD_POST, post }),
    
    updatePost: (post) => ({ type: consts.UPDATE_POST, post }),
    
    /**
     * @function togglePostStatus
     * @description Action | Change the 'deleted' property on posts based on the given status
     * @param {String} id 
     * @param {Boolean} status 
     */
    togglePostStatus: (id, status) => ({ type: consts.TOGGLE_POST_STATUS, id, status }),
    
    /**
     * @function togglePostStatus
     * @description Action | Change the 'isFavorite' property on posts
     * @param {String} id 
     * @param {Boolean} status 
     */
    togglePostFavorite: id => ({ type: consts.TOGGLE_POST_FAVORITE, id }),
    
    /**
     * @function votePost
     * @description Action | Increase/decrease votes on a post
     * @param {String} id 
     * @param {String} option 'upVote' or 'downVote' 
     */
    votePost: (id, option) => ({ type: consts.VOTE_POST, id, option }),

    /**
     * @function updateCommentCount
     * @description Action | Increase/decrease comment count on a post
     * @param {String} id 
     * @param {String} option 'up' or 'down' 
     */
    updateCommentCount: (id, option) => ({ type: consts.UPDATE_COMMENT_COUNT, id, option })
}

// Thunks
export const thunks = {
    /**
     * @function handleAddPost
     * @param {Object} post
     * @description Thunk | Add post
     */
    handleAddPost: post => dispatch => {
        // Add post to store
        dispatch(actions.addPostToStore(post));
        // Add post to API
        addPost(post)
            .catch(() => {
                // Show snackbar
                Snackbar.show({pos: 'bottom-center', text: 'Something went wrong :('});
                // Delete post
                dispatch(actions.togglePostStatus(post.id, true));
            })
    },

    /**
     * @function handleUpdatePost
     * @param {Object} post
     * @description Thunk | Update post
     */
    handleUpdatePost: post => dispatch => {
        // Update post on store
        dispatch(actions.updatePost(post));
        // Update post to API
        editPost(post.id, post)
            .catch(() => {
                // Show snackbar
                Snackbar.show({pos: 'bottom-center', text: 'Something went wrong :('});
            })
    },

    /**
     * @method handleVotePost
     * @description Thunk | post voting
     * @param {String} id Post ID
     * @param {String} option 'upVote' or 'downVote'
     */
    handleVotePost: (id, option) => dispatch => {
        // Dispatch to store
        dispatch(actions.votePost(id, option));
        // API
        voteOnPost(id, option)
            .catch(() => {
                // Un-vote if any error occurs
                const backVote = option === 'upVote' ? 'downVote' : 'upVote';
                dispatch(actions.votePost(id, backVote));
            })
    },

    /**
     * @method handleDeletePost
     * @description Thunk | delete post
     * @param {String} id Post ID
     */
    handleDeletePost: id => dispatch => {
        // Dispatch to store
        dispatch(actions.togglePostStatus(id, true));
        // Show snackbar
        undoDeleteOption(id, dispatch);
        // API
        deletePost(id)
            .catch(() => {
                // Un-delete if any error occurs
                dispatch(actions.togglePostStatus(id, false));
            });
    },

    handleFavoritePost: id => dispatch => {
        // Dispatch to store
        dispatch(actions.togglePostFavorite(id));
        // API
        favoritePost(id)
            .catch(() => {
                // Un-favorite if any error occurs
                dispatch(actions.togglePostFavorite(id));
            })
    }
}


/**
 * @function undoDeleteOption
 * @description Handle the Undo snackbar
 * @param {Srting} id 
 * @param {Function} dispatch 
 */
function undoDeleteOption(id, dispatch) {
    Snackbar.show({
        pos: 'bottom-center',
        text: 'The post was deleted.',
        actionText: 'UNDO',
        duration: 6000,
        onActionClick: () => {
            Snackbar.close();
            // Un-delete post from store
            dispatch(actions.togglePostStatus(id, false));
            // Snack success
            Snackbar.show({pos: 'bottom-center', text: 'The post is back :)', actionText: 'CLOSE', onActionClick: () => Snackbar.close() })
            // Un-delete post from API
            publishPost(id).catch(() => {
                // Re-delete if any error occurs
                dispatch(actions.togglePostStatus(id, true));
                // Snack error
                Snackbar.show({pos: 'bottom-center', text: 'Something went wrong :('})
            });
        }
    });
}
