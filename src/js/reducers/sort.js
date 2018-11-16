import { consts } from '../actions/sort';

const INITIAL_STATE = {
    sortby: 'timestamp',
    orderby: 'desc'
}

export default function sortCriteria (state = INITIAL_STATE, action) {
    switch (action.type) {
        case consts.SORT_BY:
            return {
                ...state,
                sortby: action.sortby
            }
        case consts.TOGGLE_ORDER_BY:
            return {
                ...state,
                orderby: state.orderby === 'asc' ? 'desc' : 'asc'
            }
        default:
            return state;
    }
}