import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import DocumentTitle from 'react-document-title';

// Illustration
import thankYou from '../../../images/thank-you.svg';

// Components
import Header from '../Header';

export default () => (
    <DocumentTitle title="Credits - Readable">
        <Fragment>
            {/* Header */}
            <Header subtitle="Credits" />
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div>
                            <strong>Code:</strong>
                            <ul>
                                <li>Eric Gruby</li>
                            </ul>
                        </div>
                        <div>
                            <strong><a href="https://medium.com" target="_blank" rel="noopener noreferrer">Medium</a> Posts by <small>(Alphabetically)</small>:</strong>
                            <ul>
                                <li><a href="https://medium.com/wineofbits/concepts-to-become-an-advanced-react-developer-684d90c086c2" target="_blank" rel="noopener noreferrer">Dhanraj Acharya</a></li>
                                <li><a href="https://medium.com/backticks-tildes/setting-up-a-redux-project-with-create-react-app-e363ab2329b8" target="_blank" rel="noopener noreferrer">Esther Falayi</a></li>
                                <li><a href="https://medium.com/@hamzzza.ahmed95/a-beginners-guide-to-reactjs-2b59db83fa18" target="_blank" rel="noopener noreferrer">hamza ahmed</a></li>
                                <li><a href="https://medium.freecodecamp.org/learning-react-roadmap-from-scratch-to-advanced-bff7735531b6" target="_blank" rel="noopener noreferrer">Srebalaji Thirumalai</a></li>
                                <li><a href="https://medium.com/mofed/reduxs-mysterious-connect-function-526efe1122e4" target="_blank" rel="noopener noreferrer">tyler clark</a></li>
                            </ul>
                        </div>
                        <div>
                            <strong>Illustrations:</strong>
                            <ul>
                                <li>unDraw <a href="https://undraw.co/" target="_blank" rel="noopener noreferrer">Link &rarr;</a></li>
                            </ul>
                        </div>
                        <div>
                            <strong>Icons:</strong>
                            <ul>
                                <li>Linear Icons <a href="https://linearicons.com/" target="_blank" rel="noopener noreferrer">Link &rarr;</a></li>
                                <li>Flaticon <a href="http://flaticon.com/" target="_blank" rel="noopener noreferrer">Link &rarr;</a></li>
                            </ul>
                        </div>
                        <div>
                            <strong>Micro interactions:</strong>
                            <ul>
                                <li>GSAP <a href="https://greensock.com" target="_blank" rel="noopener noreferrer">Link &rarr;</a></li>
                            </ul>
                        </div>
                        <div>
                            <strong>CSS:</strong>
                            <ul>
                                <li>Bootstrap 4 <a href="http://getbootstrap.com" target="_blank" rel="noopener noreferrer">Link &rarr;</a></li>
                            </ul>
                        </div>
                        <p><strong>Thanks, <a href="http://udacity.com" target="_blank" rel="noopener noreferrer">Udacity</a></strong> for teaching me React & Redux</p>
                        <hr className="my-4"/>
                        <p>
                            <Link to="/" className="btn bg-complementary--gradient"><span>&larr; Home</span></Link>
                        </p>
                    </div>
                    <div className="col-12 col-md-6">
                        <img src={thankYou} className="img-fluid" alt="Thanks!"/>
                    </div>
                </div>
            </div>
        </Fragment>
    </DocumentTitle>
)