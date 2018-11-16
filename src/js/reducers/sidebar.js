import { consts } from "../actions/sidebar";

const INITIAL_STATE = {
    sidebar: 'basic',
    showSidebarMobile: false
}

export default function sidebar (state = INITIAL_STATE, action) {
    switch (action.type) {
        case consts.SWITCH_SIDEBAR:
            return {
                ...state,
                sidebar: action.page
            }
        case consts.TOGGLE_SIDEBAR_MOBILE:
            return {
                ...state,
                showSidebarMobile: !state.showSidebarMobile
            }
        default:
            return state
    }
}