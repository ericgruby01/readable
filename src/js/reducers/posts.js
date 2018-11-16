import { consts } from "../actions/posts";

export default function posts(state = {}, action) {
    switch (action.type) {
        case consts.RECEIVE_POSTS:
            return {
                ...state,
                ...action.posts.reduce((posts, post) => {
                    posts[post.id] = post;
                    return posts;
                }, {})
            };
        case consts.ADD_POST:
            return {
                ...state,
                [action.post.id]: action.post
            };
        case consts.UPDATE_POST:
            return {
                ...state,
                [action.post.id]: {
                    ...state[action.post.id],
                    ...action.post
                }
            };
        case consts.TOGGLE_POST_STATUS:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    deleted: action.status
                }
            };
        case consts.TOGGLE_POST_FAVORITE:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    isFavorite: !state[action.id].isFavorite
                }
            };
        case consts.UPDATE_COMMENT_COUNT:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    commentCount:
                            action.option === "up"
                            ? state[action.id].commentCount + 1
                            : state[action.id].commentCount - 1
                }
            }
        case consts.VOTE_POST:
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    voteScore:
                        action.option === "upVote"
                            ? state[action.id].voteScore + 1
                            : state[action.id].voteScore - 1
                }
            };
        default:
            return state;
    }
}
