import { actions as actionPosts } from './posts';
import { actions as categoryActions } from './categories';
import { actions as initiapPageActions } from '../actions/initialPage';
import { actions as loggedUserActions } from '../actions/loggedUser';
import { getInitialData } from '../utils/api';

const loggedUser = 'Udacity Student';

/**
 * @function handleInitialData
 * @description Set the logged user, fetch posts and categories, and toggle the loading/error screen.
 */
const handleInitialData = () => dispatch => getInitialData()
.then(({ posts, categories }) => {
    dispatch(loggedUserActions.setUser(loggedUser));
    dispatch(actionPosts.receivePosts(posts.data));
    dispatch(categoryActions.receiveCategories(categories.data.categories));
    dispatch(initiapPageActions.toggleLoading(false));
})
.catch(error => {
    console.log(error);
    dispatch(initiapPageActions.toggleLoading(false));
    dispatch(initiapPageActions.toggleError(true));
});

export default handleInitialData;