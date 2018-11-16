import { consts } from  '../actions/categories';

export default function categories (state = {}, action) {
    switch (action.type) {
        case consts.RECEIVE_CATEGORIES:
            return {
                ...state,
                ...action.categories.reduce((categories, category) => {
                    categories[category.path] = {...category};
                    return categories;
                }, {})
            }
        case consts.ADD_CATEGORY:
            return {
                ...state,
                [action.category.path]: action.category
            }
        default:
            return state;
    }
}