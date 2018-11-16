import {addCategory as addCatApi} from '../utils/api';

// consts
export const consts = {
    RECEIVE_CATEGORIES: 'RECEIVE_CATEGORIES',
    ADD_CATEGORY: 'ADD_CATEGORY',
    ACTIVE_CATEGORY: 'ACTIVE_CATEGORY'
}

// Actions
export const actions = {
    /**
     * @function receiveCategories
     * @description Action | Insert categories to store
     * @param {Object} categories
     */
    receiveCategories: categories => ({ type: consts.RECEIVE_CATEGORIES, categories }),

    /**
     * @function addCategory
     * @description Action | Add a new category
     * @param {Object} category {path: 'url-friendly', name: 'Category Name' }
     */
    addCategory: category => ({ type: consts.ADD_CATEGORY, category })
}

// Thunks
export const thunks = {
    /**
     * @function handleAddCategory
     * @description Thunk | Add a new category to the store and the API
     * @param {Object} category {path: 'url-friendly', name: 'Category Name' }
     */
    handleAddCategory: category => dispatch => {
        // Add category to store
        dispatch(actions.addCategory(category));
        // Add category to API
        addCatApi(category)
            .catch(error => console.log(error))
    }
}