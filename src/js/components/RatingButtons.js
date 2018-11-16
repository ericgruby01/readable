import React from 'react';

// Components
import LikeButton from './LikeButton';

const RatingButtons = ({ className, score, onVote }) => (
    <div className={className}>
        <LikeButton option="upVote" onClick={() => onVote('upVote')} />
        <div className="score">{score}</div>
        <LikeButton option="downVote" onClick={() => onVote('downVote')} />
    </div>
)

export default RatingButtons;
