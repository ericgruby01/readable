import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

// Actions
import handleInitialData from '../actions/shared';

// Components
import Home from './Routes/Home';
import Credits from './Routes/Credits';
import Category from './Routes/Category';
import SinglePost from './Routes/SinglePost';
import PostForm from './Routes/PostForm';
import Footer from './Footer';
import ScrollToTop from './ScrollToTop';
import ToTopButton from './ToTopButton';
import MobileMenuButton from './MobileMenuButton';

class App extends Component {

  /**
   * @method componentDidMount
   * @description Lifecycle method
   */
  componentDidMount() {
    // Get initial data and dispatch to store
    this.props.handleInitialData();
  }

  /**
   * @method render
   * @description Lifecycle method
   */
  render() {
    return (
        <Router>
            <div id="app">
              <div id="content">
                  <ScrollToTop>
                    <Switch>
                      <Route exact path="/" component={Home} />
                      <Route exact path="/new-post" component={PostForm} />
                      <Route exact path="/credits" component={Credits} />
                      <Route exact path="/edit-post/:id" component={PostForm} />
                      <Route exact path="/:category/:id" component={SinglePost} />
                      <Route exact path="/:category" component={Category} />
                    </Switch>
                  </ScrollToTop>
              </div>
              <MobileMenuButton />
              <ToTopButton />
              <Footer />
            </div>
        </Router>
    );
  }
}

/**
 * @function mapDispatchToProps
 */
const mapDispatchToProps = dispatch => bindActionCreators({ handleInitialData }, dispatch);

export default connect(null, mapDispatchToProps)(App);
