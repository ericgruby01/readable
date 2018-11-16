import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';

// Action
import { actions as actionsSidebar } from '../../actions/sidebar';

// Illustrations
import loading from '../../../images/loading.svg';
import error from '../../../images/error.svg';

// Global helper
import { postsOrganizer } from '../../utils/GlobalHelpers';

// Components
import MainStructure from '../MainStructure';
import PostLoop from '../PostLoop';
import IllustrationSpace from '../IllustrationSpace';
import Header from '../Header';

class Home extends React.Component {
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
        const { posts, initialPage } = this.props;
        
        return (
            <DocumentTitle title="Enjoy the content - Readable">
                <Fragment>
                    {/* Header */}
                    <Header subtitle="Enjoy the content" />
                    {initialPage.loading ? (
                    // If is loading
                    <IllustrationSpace
                      illustration={loading}
                      title="Loading"
                      description="Wait! Awesome contents are being loaded for ya."
                    />
                  ) : initialPage.error ? (
                    // If the server is down...
                    <IllustrationSpace
                      illustration={error}
                      altText="Error!"
                      title="Oh, snap!"
                      description="Our server is down.">
                        <p onClick={() => window.location.reload()} className="text-complementary cursor-pointer">Try again?</p>
                      </IllustrationSpace>
                  ) : (
                    // If everything is OK...
                    <Fragment>
                        {/* Content */}
                        <MainStructure content={<PostLoop posts={posts}/>}/>
                    </Fragment>
                  )}
                </Fragment>
            </DocumentTitle>
        )
    }
}

/**
 * @function mapStateToProps
 * @param {Object} State 
 */
function mapStateToProps({ initialPage, posts, filterCriteria, sortCriteria }) {
  const allPosts = Object.values(posts);
  const publishedPosts = allPosts.filter(post => !post.deleted);
  return {
    posts: postsOrganizer(publishedPosts, filterCriteria, sortCriteria),
    initialPage
  }
}

/**
 * @function mapDispatchToProps
 * @param {Function} dispatch
 */
const mapDispatchToProps = dispatch => bindActionCreators({ ...actionsSidebar }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);