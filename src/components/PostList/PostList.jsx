import React, { useEffect, useState } from 'react';
import style from './postList.module.css';
import PostCard from '../PostCard/PostCard';
import Pagination from '../Pagination/Pagination';
import usePagination from '../../hooks/usePagination';

const PostList = ({ posts, myPosts, myFavoritePosts }) => {
    const [filteredPosts, setFilteredPosts] = useState([]);
    const paginate = usePagination(filteredPosts, 4);

    useEffect(() => {
        if(myPosts) {
            setFilteredPosts(myPosts);
        } else if(myFavoritePosts) {
            setFilteredPosts(myFavoritePosts);
        } else {
            setFilteredPosts(posts);
        }
    }, [myPosts, myFavoritePosts, posts]);

    return (
        <div className={style.posts}>
            <Pagination paginate={paginate} />
            { paginate.setPageData().map((el, i) => <PostCard key={el._id+i} {...el} />) }
        </div>
    )
}

export default PostList;