import React, { useEffect, useState, useContext } from "react";

import style from './myComments.module.css';

import Menu from "../../components/Menu/Menu";
import context from "../../context/context";
import EmptyPage from "../../components/EmptyPage/EmptyPage";
import MyComment from "../../components/MyComment/MyComment";

const MyComments = () => {
    const {user, api} = useContext(context);
    const usr = JSON.parse(user);
    const [myComments, setMyComments] = useState([]);

    useEffect(() => {
        api.getAllComments()
            .then(comments => {
                setMyComments(comments.filter(el => el.author._id === usr._id));
            })
    }, [myComments])

    return (
        <div className={style.container}>
            <Menu />
            <div className={style.content}>
                {myComments.length > 0
                ? myComments.map(comment => <MyComment {...comment} key={comment._id} />)
                : <EmptyPage fromPage={'myComments'} />
                }
            </div>
        </div>
    )
}

export default MyComments;