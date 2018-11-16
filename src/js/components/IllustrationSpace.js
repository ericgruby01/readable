import React from 'react';

const IllustrationSpace = ({illustration, altText, title, description, children}) => (
    <div className="container illustration-space">
        <div className="row">
            <div className="col-12 text-center">
                <h1>{title}</h1>
                <p className="lead">{description}</p>
                <img src={illustration} alt={altText} width="300px" className="mb-3"/>
                {children}
            </div>
        </div>
    </div>
)

export default IllustrationSpace;