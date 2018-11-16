/**
 * @method postsOrganizer
 * @description Apply the filters & sort posts
 * @param {Array} posts           posts from redux
 * @param {Object} filterCriteria filter criteria from redux
 * @param {Object} sortCriteria   sort criteria from redux
 */
const postsOrganizer = (posts, filterCriteria, sortCriteria) => {
  const { query } = filterCriteria;
  const { sortby, orderby } = sortCriteria;

  const filterByQuery = query === "" ? posts : posts.filter(post => {
    return post.title.toLowerCase().includes(query.toLowerCase()) || post.body.toLowerCase().includes(query.toLowerCase());
  });

  const orderedPosts = [...filterByQuery].sort((a, b) => { 
    return orderby === 'desc' ? b[sortby] - a[sortby] : a[sortby] - b[sortby];
  });
  
  return orderedPosts;
}

/**
 * @function formatPost
 * @description Setup post to add it to redux store
 * @param {Object} post {title, body, excerpt, category}
 */
const formatPost = post => ({
  id: uniqid(),
  timestamp: Date.now(),
  voteScore: 0,
  deleted: false,
  commentCount: 0,
  ...post,
})

/**
 * @function formaComment
 * @description Setup comment to add it to redux store
 * @param {Object} comment {body, author}
 * @param {String} postId
 */
const formaComment = (comment, postId) => ({
  id: uniqid('comm_'),
  parentId: postId,
  timestamp: Date.now(),
  voteScore: 0,
  deleted: false,
  parentDeleted: false,
  isEditing: false,
  ...comment
})

/**
 * @function truncate
 * @description Crops a given limit of characters
 * @param  {String}   string string to be cropped
 * @param  {Integrer} limit  number of limited charatcters
 * @param  {String}   hellip text delimiter
 * @return {String}
 */
const truncate = (string, limit = 20, hellip = '…') => {
  if (!string) return;
	if (string.length <= limit) return string;
  return string.substring(0, limit) + hellip;
}

/**
 * @function capitalize
 * @description Capitalize first letter of string
 * @param {String} string 
 */
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1);

/**
 * @function uniqid
 * @description Returns a random unique ID
 * @return {String}
 */
const uniqid = (prefix = 'id_') => prefix + (Math.random(Date.now()*16).toString(36).substring(2));

export {
    truncate,
    uniqid,
    formatPost,
    capitalize,
    postsOrganizer,
    formaComment
}