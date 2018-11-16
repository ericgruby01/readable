import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
    <div id="footer" className="bg-primary--gradient text-light mt-4">
        Readable &copy; {new Date().getFullYear()} <Link to="/credits" className="text-light"><u>Credits</u></Link>
    </div>
)