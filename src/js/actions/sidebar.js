// Consts
export const consts = {
    SWITCH_SIDEBAR: 'SWITCH_SIDEBAR',
    TOGGLE_SIDEBAR_MOBILE: 'TOGGLE_SIDEBAR_MOBILE'
}

// Actions
export const actions = {
    /**
     * @function switchSidebar
     * @description Action | Switch the sidebar depending on the page context
     * @param {String} page 'basic', 'single' or 'edit'
     */
    switchSidebar: page => ({ type: consts.SWITCH_SIDEBAR, page }),

    /**
     * @function toggleSidebarMobile
     * @description Action | Show/Hide the mobile sidebar
     */
    toggleSidebarMobile: () => ({ type: consts.TOGGLE_SIDEBAR_MOBILE }),
}