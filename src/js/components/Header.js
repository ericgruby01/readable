import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({subtitle, children}) => (
    <div className="App bg-primary--gradient text-light mb-4">
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1><Link to="/" className="text-light">Readable</Link></h1>
          <p className="lead mb-0">{subtitle || children}</p>
        </div>
      </div>
    </div>
  </div>
)

export default Header;