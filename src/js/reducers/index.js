import posts from './posts';
import categories from './categories';
import comments from './comments';
import filterCriteria from './filter';
import sortCriteria from './sort';
import sidebar from './sidebar';
import initialPage from './initialPage';
import loggedUser from './loggedUser';

import { combineReducers } from 'redux';

export default combineReducers ({
    initialPage,
    loggedUser,
    posts,
    comments,
    categories,
    filterCriteria,
    sidebar,
    sortCriteria
});