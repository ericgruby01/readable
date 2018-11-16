import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// Global helpers
import { formatPost } from '../utils/GlobalHelpers';

// Actions
import { thunks as thunkPosts } from '../actions/posts';

// Components
import ReactMarkdown from 'react-markdown';
import SelectCategory from './SelectCategory';

class Form extends Component {
    /**
     * @property {Object} state
     */
    state = {
        category: '',
        body: '',
        title: '',
        excerpt: '',
        receivedPost: false,
        published: false,
        errors: {}
    }

    /**
     * @property {Number} excerptLimit
     */
    excerptLimit = 140;

    /**
     * @method updateCategory
     * @description Update the state's category
     */
    updateCategory = category => {
        this.setState({
            category,
            errors: {
                ...this.state.errors,
                category: undefined
            }
        })
    }

    /**
     * @method updateTitle
     * @description Update the state's title
     */
    updateTitle = e => {
        const title = e.target.value;
        this.setState({
            title,
            errors: {
                ...this.state.errors,
                title: undefined
            }
        })
    }

    /**
     * @method updateBody
     * @description Update the state's body
     */
    updateBody = e => {
        const body = e.target.value;
        this.setState({
            body,
            errors: {
                ...this.state.errors,
                body: undefined
            }
        })
    }

    /**
     * @method updateExcerpt
     * @description Update the state's excerpt
     */
    updateExcerpt = e => {
        const excerpt = e.target.value;
        this.setState({
            excerpt,
            errors: {
                ...this.state.errors,
                excerpt: undefined
            }
        })
    }

    /**
     * @method submitPost
     * @description Validates and submit the form
     */
    submitPost = e => {
        e.preventDefault();

        const {title, body, excerpt, category} = this.state;
        const { post, loggedUser, handleUpdatePost, handleAddPost } = this.props;

        let errors = {};

        if (title.trim() === '') {
            errors.title = true;
        }
        if (body.trim() === '') {
            errors.body = true;
        }
        if (excerpt.trim() === '') {
            errors.excerpt = true;
        }
        if (category.trim() === '' || category.trim() === 'other') {
            errors.category = true;
        }

        this.setState({errors});

        // If there are errors, will not continue the submition
        if (Object.keys(errors).length > 0) return;

        let fields = {title, body, category, excerpt, author: loggedUser};
        let newPost = formatPost(fields);

        // Check if is a new post or an existing post
        if (post.id) {
            // Is editing
            handleUpdatePost({...fields, id: post.id});
        } else {
            // Is new
            handleAddPost(newPost);
        }

        this.setState({published: true});
    }

    /**
     * @method getDerivedStateFromProps
     * @description
     * Okay so, some people told me to NOT use that,
     * but to me it was the simplest way to sync the
     * state between the store and the component.
     * @param {Object} nextProps 
     * @param {Object} prevState 
     */
    static getDerivedStateFromProps(nextProps, prevState) {
        let willReturn = {};
        if (prevState.receivedPost) return null;
        if (nextProps.post.title && (prevState.title === '')) {
            willReturn = {...willReturn, title: nextProps.post.title, receivedPost: true}
        }
        if (nextProps.post.body && (prevState.body === '')) {
            willReturn = {...willReturn, body: nextProps.post.body, receivedPost: true}
        }
        if (nextProps.post.category && (prevState.category === '')) {
            willReturn = {...willReturn, category: nextProps.post.category, receivedPost: true}
        }
        if (nextProps.post.excerpt && (prevState.excerpt === '')) {
            willReturn = {...willReturn, excerpt: nextProps.post.excerpt, receivedPost: true}
        }
        return willReturn;
    }

    /**
     * @method render
     * @description Lifecycle method
     */
    render() {
        const { post } = this.props;
        const { title, body, excerpt, category, errors, published } = this.state;
        return published ? <Redirect to="/" /> : (
            <div id="form">
                <form className="box mb-3" onSubmit={this.submitPost}>
                    <div className="form-group">
                        <label htmlFor="title">Title {errors.title && <small className="text-danger">Required <span className="lnr lnr-warning"></span></small>}</label>
                        <input type="text" value={title} onChange={this.updateTitle} className={errors.title ? "form-control is-invalid" : "form-control"} id="title"/>
                    </div>

                    <SelectCategory category={category} error={errors.category} onChange={this.updateCategory}/>

                    <div className="form-group">
                        <label htmlFor="post">Post {errors.body && <small className="text-danger">Required <span className="lnr lnr-warning"></span></small>}</label>
                        <textarea className={errors.body ? "form-control is-invalid" : "form-control"} rows="5" id="post" value={body} onChange={this.updateBody}></textarea>
                    </div>

                    <div className="form-group">
                        <label htmlFor="excerpt">Excerpt  {errors.excerpt ? <small className="text-danger">Required <span className="lnr lnr-warning"></span></small> : <small className="text-muted">Little excerpt of your post - no Markdown here.</small>}</label>
                        <textarea className={errors.excerpt ? "form-control is-invalid" : "form-control"} id="excerpt" value={excerpt} onChange={this.updateExcerpt}></textarea>
                        <small className="d-block mt-2 mb-3 text-right">
                            {excerpt.length > this.excerptLimit ?
                                (<span className="text-danger">Limit exceeded. Your excerpt will be cutted to fit {this.excerptLimit} characters.</span>) :
                                (`Characters: ${excerpt.length}/${this.excerptLimit}`)
                            }
                        </small>
                    </div>

                    <div className="text-right">
                        {post.id ? (
                            <div>
                                <Link className="btn btn-lightgray mr-2" to={`/${post.category}/${post.id}`}>Cancel <span className="lnr lnr-cross-circle"></span></Link>
                                <button type="submit" className="btn bg-complementary--gradient"><span>Save Post <span className="lnr lnr-checkmark-circle"></span></span></button>
                            </div>
                        ) : <button type="submit" className="btn bg-complementary--gradient"><span>Publish Post <span className="lnr lnr-checkmark-circle"></span></span></button>}
                    </div>
                </form>

                <h3>Preview:</h3>

                <div className="box mb-3">
                    <h3>{title || post.title}</h3>
                    <ReactMarkdown source={body || post.body} />
                </div>
            </div>
        )
    }
}

/**
 * @function mapStateToProps
 * @param {Object} State
 */
const mapStateToProps = ({ loggedUser }) => ({ loggedUser });

/**
 * @function mapDispatchToProps
 * @param {Function} dispatch
 */
const mapDispatchToProps = dispatch => bindActionCreators({ ...thunkPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Form);