import React from 'react';
import { connect } from 'react-redux';

// Components
import Sidebar from './Sidebar';

const MainStructure = ({ content, showSidebarMobile, post }) => (
    <div className="container">
        <div className="row py-3">
            <div className="col-12 col-lg-8">
                {content}
            </div>
            <div className={showSidebarMobile ? 'sidebar-holder col-12 col-lg-4 visible' : 'sidebar-holder col-12 col-lg-4'}>
                <Sidebar post={null || post} />
            </div>
        </div>
    </div>
)

/**
 * @function mapStateToProps
 * @param {Object} State 
 */
const mapStateToProps = ({ sidebar }) => ({ showSidebarMobile: sidebar.showSidebarMobile });

export default connect(mapStateToProps)(MainStructure);