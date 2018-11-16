import { consts } from '../actions/initialPage';

const INITIAL_STATE = {
    loading: true,
    error: false
}

export default function initialPage(state = INITIAL_STATE, action) {
    switch (action.type) {
        case consts.TOGGLE_LOADING:
            return {
                ...state,
                loading: action.bool
            }
        case consts.TOGGLE_ERROR:
            return {
                ...state,
                error: action.bool
            }
        default:
            return state;
    }
}
