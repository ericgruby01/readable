import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { actions as actionsFilter } from '../actions/filter';

class SearchInput extends Component {
    /**
     * @property {Object} state
     */
    state = {
        query: ''
    }

    /**
     * @property {setTimeout} debounce for query input
     */
    debounce = setTimeout(() => false, 0);

    /**
     * @method handleQueryUpdate
     * @description Update 'query' on the state
     */
    handleQueryUpdate = (query, clear) => {
        if (clear) this.input.value = '';
        if (query === '') return this.props.filterPosts({query: ''});
        clearTimeout(this.debounce);
        this.setState({
                query
            },
            () => {
                this.debounce = setTimeout(() => {
                    this.props.filterPosts({query: this.state.query})
                    clearTimeout(this.debounce);
                }, 500);
            }
        )
    }

    /**
     * @method render
     * @description Lifecycle method
     */
    render() {
        return (
            <div className="input-query-holder">
                <input type="text" ref={input => this.input = input} defaultValue={this.props.reduxQuery} onChange={e => this.handleQueryUpdate(e.target.value)} className="form-control" placeholder="Type a keyword..."/>
                <span className="cursor-pointer clear-query" onClick={() => this.handleQueryUpdate('', true)}>&times;</span>
            </div>
        )
    }
}

/**
 * @function mapStateToProps
 * @param {Object} State 
 */
const mapStateToProps = ({ filterCriteria }) => ({ reduxQuery: filterCriteria.query })

/**
 * @function mapDispatchToProps
 * @param {Function} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ ...actionsFilter }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);