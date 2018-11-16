import { consts } from '../actions/filter';

const INITIAL_STATE = {
    query: ''
}

export default function filterCriteria (state = INITIAL_STATE, action) {
    switch (action.type) {
        case consts.FILTER_POSTS:
            return {
                ...state,
                ...action.filter
            };
        default:
            return state;
    }
}