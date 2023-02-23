import React, { useContext, useEffect, useState } from "react";
import style from './myComments.module.css';
import Menu from "../../components/Menu/Menu";
import context from "../../context/context";
import EmptyPage from "../../components/EmptyPage/EmptyPage";
import MyComment from "../../components/MyComment/MyComment";

const MyComments = () => {
    const {user, api, myComments, setMyComments} = useContext(context);

    useEffect(() => {
        api.getAllComments()
            .then(data => {
                setMyComments(data.filter(comment => comment.author._id === JSON.parse(user)._id))
            })
    }, [])

    return (
        <div className={style.container}>
            <Menu />
            <div className={style.content}>
                { myComments.length > 0 && myComments.map((comment, i) => <MyComment {...comment} key={comment._id+i} />) }
            </div>
            {myComments.length === 0 && <EmptyPage fromPage={'myComments'} /> }
        </div>
    )
}

export default MyComments;