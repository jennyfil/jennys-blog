import React, { useEffect, useState, useContext } from "react";

import style from './myPosts.module.css';

import Menu from "../../components/Menu/Menu";
import PostList from "../../components/PostList/PostList";
import context from "../../context/context";
import EmptyPage from "../../components/EmptyPage/EmptyPage";

const MyPosts = () => {
    const {user, api, posts} = useContext(context);
    const usr = JSON.parse(user);
    const [myPosts, setMyPosts] = useState(posts.filter(el => el.author._id === usr._id));

    useEffect(() => {
        api.getAllPosts()
            .then(posts => {
                setMyPosts(posts.filter(el => el.author._id === usr._id));
            })
    },[myPosts])

    return (
        <div className={style.container}>
            <Menu />
            <div className={style.content}>
                {myPosts.length > 0
                ? <PostList myPosts={myPosts} />
                : <EmptyPage fromPage={'myPosts'} />
                }
            
            </div>
        </div>
    )
}

export default MyPosts;