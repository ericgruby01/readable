import React from 'react';
import { Link } from 'react-router-dom';

// Components
import DeletePostButton from '../DeletePostButton';

export default function SidebarEditPost ({ category, id }) {
    return (
        <div className="widget">
            <div className="row mb-3">
                <div className="col-6 col-md-12 col-lg-6">
                    <small className="muted mb-2 d-block">BACK TO POST</small>
                    <Link to={`/${category}/${id}`} className="btn btn-lightgray btn-block">Back <span className="lnr lnr-arrow-right"></span></Link>
                </div>
                <div className="col-6 col-md-12 col-lg-6"><DeletePostButton id={id} /></div>
            </div>
            <hr className="my-4"/>
        </div>
    )
}