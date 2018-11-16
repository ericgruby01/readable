import React from 'react';
import { Link } from 'react-router-dom';

// SVG
import empty from '../../images/empty.svg';

// Components
import Post from './Post';
import IllustrationSpace from './IllustrationSpace'

const PostLoop = ({posts}) => posts && posts.length > 0 ? (
    // If there are posts
    posts.map(post => <Post post={post} key={post.id}/>)
) : (
    // If there are NO posts
    <IllustrationSpace
        illustration={empty}
        altText="Oops"
        title="That's embarrassing..."
        description="There's no posts available.">
            <p><Link to="/new-post" className="text-complementary cursor-pointer">What if <u>you</u> write a post for us?</Link></p>
    </IllustrationSpace>
)

export default PostLoop;