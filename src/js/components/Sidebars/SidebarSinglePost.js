import React from 'react';
import { Link } from 'react-router-dom';

// Components
import DeletePostButton from '../DeletePostButton';

export default function SidebarSinglePost ({id}) {
    return (
        <div className="widget">
            <div className="row mb-3">
                <div className="col-6">
                    <small className="muted mb-2 d-block">EDIT POST</small>
                    <Link to={`/edit-post/${id}`} className="btn btn-lightgray btn-block">Edit <span className="lnr lnr-pencil"></span></Link>
                </div>
                <div className="col-6"><DeletePostButton id={id} /></div>
            </div>
        </div>
    )
}