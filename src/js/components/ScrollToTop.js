/**
 * This example was taken from here:
 * https://reacttraining.com/react-router/web/guides/scroll-restoration
 * 
 * I wanted this functionality for scrolling to top when the route changes.
 */

import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);