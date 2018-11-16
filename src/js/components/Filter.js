import React from 'react';

// Components
import SearchInput from './SearchInput';
import SortBy from './SortBy';

export default () => (
    <div id="filter">
        <div className="form-group">
            <small className="muted mb-2 d-block font-bold"><span className="lnr lnr-magnifier"></span> SEARCH POSTS</small>
            <SearchInput />
        </div>
        <div className="form-group">
            <small className="muted mb-2 d-block font-bold"><span className="lnr lnr-sort-amount-asc"></span> SORT BY</small>
            <SortBy />
        </div>
    </div>
)
