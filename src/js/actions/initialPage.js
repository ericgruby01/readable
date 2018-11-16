// Consts
export const consts = {
    TOGGLE_LOADING: 'TOGGLE_LOADING',
    TOGGLE_ERROR: 'TOGGLE_ERROR',
}

// Actions
export const actions = {
    /**
     * @function toggleLoading
     * @description Action | Toggle loading screen
     */
    toggleLoading: bool => ({ type: consts.TOGGLE_LOADING, bool }),

    /**
     * @function toggleError
     * @description Action | Toggle error screen
     */
    toggleError: bool => ({ type: consts.TOGGLE_ERROR, bool })
}