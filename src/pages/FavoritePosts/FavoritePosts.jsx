import React, { useEffect, useState, useContext } from "react";
import style from './favoritePosts.module.css';
import Menu from "../../components/Menu/Menu";
import PostList from "../../components/PostList/PostList";
import EmptyPage from "../../components/EmptyPage/EmptyPage";
import context from "../../context/context";

const FavoritePosts = () => {
    const {user, api, posts} = useContext(context);
    const usr = JSON.parse(user);
    const [myFavoritePosts, setMyFavoritePosts] = useState(posts.filter(el => el.likes.includes(usr._id)));

    useEffect(() => {
        api.getAllPosts()
            .then(posts => {
                setMyFavoritePosts(posts.filter(el => el.likes.includes(usr._id)));
            })
    }, [myFavoritePosts]);

    return (
        <div className={style.container}>
            <Menu from='fav' />
            <div className={style.content}>
                {myFavoritePosts.length > 0 
                    ? <PostList myFavoritePosts={myFavoritePosts} />
                    : <EmptyPage fromPage={'favorite'} />
                }
            </div>
        </div>
    )
}

export default FavoritePosts;