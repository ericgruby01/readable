import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import urlify from 'urlify';

// Global helpers
import { capitalize } from '../utils/GlobalHelpers';

// Actions
import { thunks as categoryThunks } from '../actions/categories';

/**
 * @var toUrl
 * @description Instantiate the urlify lib
 */
const toUrl = urlify.create({toLower: true});
 
class SelectCategory extends Component {
    /**
     * @method addCategory
     * @description Get the new value and generate a new category
     */
    addCategory = () => {
        let category = this.inputCategory.value;
        if (category.trim() === '') return;
        // List existent categories
        let existentCategories = Object.values(this.props.categories).reduce((allPaths, category) => {
            allPaths.push(category.path);
            return allPaths;
        }, []);
        // if the user types an existing category, there's no need to add/overwrite stuff... right?
        if (existentCategories.indexOf(toUrl(category)) > -1) {
            this.inputCategory.value = '';
            this.props.onChange(toUrl(category))
            return;
        }
        let newCategory = {path: toUrl(category), name: capitalize(category)};
        this.inputCategory.value = '';
        this.props.handleAddCategory(newCategory);
        this.props.onChange(newCategory.path)
    }

    /**
     * @method cancel
     * @description function called if the user hit on cancel button
     */
    cancel = e => {
        e.preventDefault();
        this.props.onChange('')
    };

    /**
     * @method render
     * @description Lifecycle method
     */
    render() {
        const {categories, error, category, onChange} = this.props;
        return category !== 'other' ? (
                <div className="form-group">
                    <label htmlFor="category">Category {error && <small className="text-danger">Required <span className="lnr lnr-warning"></span></small>}</label>
                    <select id="category" className={error ? "form-control text-capitalize is-invalid" : "form-control text-capitalize"} defaultValue={category} onChange={e => onChange(e.target.value)}>
                        <option value="">Select...</option>
                        {Object.values(categories).map(category => (
                            <option key={category.path} value={category.path} className="text-capitalize">{category.name}</option>
                        ))}
                        <option value="other">Add New Category +</option>
                    </select>
                </div>
            ) : (
                <div className="form-group">
                    <label htmlFor="category">Add Category  {error && <small className="text-danger">Required <span className="lnr lnr-warning"></span></small>}</label>
                    <div className="input-group">
                        <input type="text" ref={input => this.inputCategory = input} className={error ? "form-control is-invalid" : "form-control"} id="category"/>
                        <div className="input-group-append">
                            <button className="btn btn-danger--gradient" onClick={this.cancel} type="button"><span>Cancel</span></button>
                            <button className="btn btn-success--gradient" onClick={this.addCategory} type="button"><span>Add <span className="lnr lnr-plus-circle"></span></span></button>
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
const mapStateToProps = ({ categories }) => ({ categories });

/**
 * @function mapDispatchToProps
 * @param {Function} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ ...categoryThunks }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SelectCategory);