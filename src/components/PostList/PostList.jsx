import React, { useContext } from 'react';

import style from './postList.module.css';

import PostCard from '../PostCard/PostCard';

const PostList = ({ posts, myPosts, myFavoritePosts }) => {

    return (
        <div className={style.posts}>
            { posts && posts.map((el) => <PostCard key={el._id} {...el} />) }
            { myPosts && myPosts.map((el) => <PostCard key={el._id} {...el} />) }
            { myFavoritePosts && myFavoritePosts.map((el) => <PostCard key={el._id} {...el} />) }
        </div>
    )
}

export default PostList;