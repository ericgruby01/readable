import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Actions
import { actions as actionsSidebar } from '../actions/sidebar';

const MobileMenuButton = ({ toggleSidebarMobile, showSidebarMobile }) => (
    <div id="mobile-menu-btn" className={showSidebarMobile ? 'close' : ''} onClick={() => toggleSidebarMobile()}>
        {showSidebarMobile ? (
            <span className="lnr lnr-cross"></span>
        ) : (
            <span className="lnr lnr-menu"></span>
        )}
    </div>
)

/**
 * @function mapStateToProps
 * @param {Object} State 
 */
const mapStateToProps = ({ sidebar }) => ({ showSidebarMobile: sidebar.showSidebarMobile });

/**
 * @function mapDispatchToProps
 * @param {Function} dispatch
 */
const mapDispatchToProps = dispatch => bindActionCreators({ toggleSidebarMobile: actionsSidebar.toggleSidebarMobile }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenuButton);