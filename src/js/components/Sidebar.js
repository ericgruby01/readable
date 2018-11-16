import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import 'resize-sensor';
import StickySidebar from 'sticky-sidebar';

// Components
import SidebarSinglePost from './Sidebars/SidebarSinglePost';
import SidebarEditPost from './Sidebars/SidebarEditPost';
import CategoriesList from './CategoriesList';
import FavoritesList from './FavoritesList';
import PublishedPosts from './PublishedPosts';
import Filter from './Filter';
import LoggedUser from './LoggedUser';

class Sidebar extends Component {

    componentDidMount() {
        new StickySidebar('.sticky', {
            topSpacing: 20,
            bottomSpacing: 20,
            containerSelector: '.sidebar-holder',
            innerWrapperSelector: '#sidebar'
          });
    }

    /**
     * @method renderSidebar
     * @description Change the sidebar state depending on the store
     */
    renderSidebar = () => {
        const { post, category, sidebar } = this.props;
        switch (sidebar) {
            case 'basic':
                return <Filter />
            case 'single':
                return (
                    post ?
                    <Fragment>
                        <LoggedUser user={post.author}>
                            <SidebarSinglePost id={post.id} />
                        </LoggedUser>
                        <div className="widget mb-4">
                            <div className="row">
                                <div className="col-12">
                                    <button className="btn-block btn btn-secondary-complementary--gradient" onClick={e => document.getElementById('comments').scrollIntoView({ block: 'start', behavior: 'smooth' })}><span>Scroll to Comments <span className="lnr lnr-bubble"></span></span></button>
                                </div>
                            </div>
                        </div>
                    </Fragment> : null
                );
            case 'edit':
                return post ? <LoggedUser user={post.author}><SidebarEditPost id={post.id} category={category} /></LoggedUser> : null
            default:
                return <Filter />
        }
    }

    /**
     * @method render
     * @description Lifecycle method
     */
    render() {
        const { id, sidebar, loggedUser, match } = this.props;
        return (
            <div className="sticky">
                <div id="sidebar" className="box">
                    <div className="bg-white">
                        <div className="widget mb-3 text-uppercase">
                            <span className="lnr lnr-user"></span> Welcome, <strong>{loggedUser}</strong>
                            <hr/>
                        </div>
                        <div className="widget">
                            {this.renderSidebar()}
                        </div>
                        <div className="widget">
                            {sidebar === 'edit' && (
                                <Fragment>
                                    <h3>Did you know?</h3>
                                    <p>You can use Markdown to format your post. Insert images, links, lists and tables with ease.</p>
                                    <p>Need help with Markdown? <a href="https://learnxinyminutes.com/docs/markdown/" rel="noopener noreferrer" target="_blank">Learn here</a></p>
                                    <hr className="my-4"/>
                                </Fragment>
                            )}
                            <CategoriesList active={match.params.category} />
                            <PublishedPosts active={match.params.id} />
                            <FavoritesList active={match.params.id} />
                            <Link to={id || sidebar === 'edit' ? '/' : '/new-post'} className="btn btn-block bg-complementary--gradient">
                                {id || sidebar === 'edit' ? <span>Back to Home <span className="lnr lnr-home"></span></span> : <span>New Post <span className="lnr lnr-file-add"></span></span>}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

/**
 * @function mapStateToProps
 * @param {Object} State 
 */
const mapStateToProps = ({ sidebar, loggedUser }) => ({ sidebar: sidebar.sidebar, loggedUser });

export default withRouter(connect(mapStateToProps)(Sidebar));