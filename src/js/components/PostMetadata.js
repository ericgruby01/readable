import React from 'react';

export default function PostMetadata ({post}) {
    const { timestamp, author, commentCount } = post;
    const getDate = new Date(timestamp).toLocaleDateString();
    return (
        <div className="meta-data">
            <div className="meta date">
                <span className="lnr lnr-calendar-full"></span> {getDate}
            </div>
            <span className="meta author">
                <span className="lnr lnr-user"></span> {author}
            </span>
            <span className="meta comments">
                <span className="lnr lnr-bubble"></span> {commentCount}
            </span>
        </div>
    )
}