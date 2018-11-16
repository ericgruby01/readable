import { consts } from "../actions/comments";

export default function comments (state = {}, action) {
    switch (action.type) {
        case consts.SET_COMMENTS:
            return {
                ...state,
                ...action.comments.reduce((allComments, comment) => {
                    allComments[comment.id] = {...comment, isEditing: false};
                    return allComments;
                }, {})
            }
        case consts.ADD_COMMENT:
            return {
                ...state,
                [action.comment.id]: action.comment
            }
        case consts.UPDATE_COMMENT:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    body: action.comment.body,
                    timestamp: action.comment.timestamp
                }
            }
        case consts.TOGGLE_COMMENT_STATUS:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    deleted: action.status
                }
            }
        case consts.TOGGLE_COMMENT_EDITING:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    isEditing: action.status
                }
            }
        case consts.VOTE_COMMENT:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore: action.option === 'upVote' ?
                               state[action.id].voteScore + 1 :
                               state[action.id].voteScore - 1
                }
            }
        default:
            return state;
    }
}