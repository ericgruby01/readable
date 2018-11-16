import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

// Actions
import { actions } from '../actions/sort';

// Icons
import asc from '../../images/asc.svg';
import desc from '../../images/desc.svg';

class SortBy extends Component {
    /**
     * @method changeSort
     * @description Dispatch a new sortby value
     * @param {String} value voteScore, commentCount, timestamp
     */
    changeSort = e => {
        this.props.sortBy(e.target.value)
    }

    /**
     * @method changeOrder
     * @description Dispatch an action that toggles between 'asc' & 'desc'
     */
    changeOrder = () => {
        this.props.toggleOrderBy();
    }

    /**
     * @method render
     * @description Lifecycle method
     */
    render() {
        const { sortCriteria } = this.props;        
        return (
            <div className="input-group">
                <select value={sortCriteria.sortby} onChange={this.changeSort} className="custom-select">
                    <option value="timestamp">Date</option>
                    <option value="voteScore">Votes</option>
                    <option value="commentCount">Comments</option>
                </select>
                <div className="input-group-append">
                    <button style={{width: '85px'}} onClick={this.changeOrder} className="btn btn-secondary--gradient text-light text-right" type="button">
                        <span><small className="pr-2">{sortCriteria.orderby === 'desc' ? 'DESC' : 'ASC'} </small> <img src={sortCriteria.orderby === 'desc' ? desc : asc} alt="Desc" style={{width: '16px'}}/></span>
                    </button>
                </div>
            </div>
        )
    }
}

/**
 * @function mapStateToProps
 * @param {Object} state 
 */
const mapStateToProps = ({ sortCriteria }) => ({ sortCriteria });

/**
 * @function mapDispatchToProps
 * @param {Function} dispatch 
 */
const mapDispatchToProps = dispatch => bindActionCreators({ ...actions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SortBy);