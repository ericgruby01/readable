import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';

// Action
import { actions as actionsSidebar } from '../../actions/sidebar';

// Global helper
import { postsOrganizer } from '../../utils/GlobalHelpers';

// Components
import Header from '../Header';
import MainStructure from '../MainStructure';
import PostLoop from '../PostLoop';

class Category extends Component {
  /**
   * @method componentDidMount
   * @description Lifecycle method
   */
  componentDidMount() {
    this.props.switchSidebar('basic');
  }

  /**
   * @method render
   * @description Lifecycle method
   */
  render() {
    const category = this.props.match.params.category;
    const { posts } = this.props;
    return (
      <DocumentTitle title={`Category: ${category} - Readable`}>
        <Fragment>
          {/* Header */}
          <Header>Category: <span className="text-capitalize">{category}</span></Header>
          {/* Content */}
          <MainStructure content={<PostLoop posts={posts} />}/>
        </Fragment>
      </DocumentTitle>
    )
  }
}

/**
 * @function mapStateToProps
 * @param {Object} State
 * @param {Object} Props Component's own props
 */
function mapStateToProps({ posts, filterCriteria, sortCriteria }, {match}) {
  const allPosts = Object.values(posts).filter(post => !post.deleted && (post.category === match.params.category));
  return {
    posts: postsOrganizer(allPosts, filterCriteria, sortCriteria),
  }
}

/**
 * @function mapDispatchToProps
 * @param {Function} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ ...actionsSidebar }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Category);

