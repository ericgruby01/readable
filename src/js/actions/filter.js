// Consts
export const consts = {
    FILTER_POSTS: 'FILTER_POSTS'
}

// Actions
export const actions = {
    /**
     * @function filterPosts
     * @description Action | Change the query for searching posts
     */
    filterPosts: filter => ({ type: consts.FILTER_POSTS, filter })
}