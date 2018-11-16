// Consts
export const consts = {
    SORT_BY: 'SORT_BY',
    TOGGLE_ORDER_BY: 'TOGGLE_ORDER_BY'
}

// Actions
export const actions = {
    /**
     * @function sortBy
     * @description Action | Set the sort criteria
     * @param {String} sortby 'voteScore', 'timestamp', 'commentCount'
     */
    sortBy: sortby => ({ type: consts.SORT_BY, sortby }),

    /**
     * @function toggleOrderBy
     * @description Action | 
     */
    toggleOrderBy: () => ({ type: consts.TOGGLE_ORDER_BY })
}