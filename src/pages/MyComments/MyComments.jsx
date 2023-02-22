import React, { useContext } from "react";
import style from './myComments.module.css';
import Menu from "../../components/Menu/Menu";
import context from "../../context/context";
import EmptyPage from "../../components/EmptyPage/EmptyPage";
import MyComment from "../../components/MyComment/MyComment";

const MyComments = () => {
    const {myComments} = useContext(context);

    return (
        <div className={style.container}>
            <Menu />
            <div className={style.content}>
                { myComments.length > 0 && myComments.map(comment => <MyComment {...comment} key={comment._id} />) }
            </div>
            {myComments.length === 0 && <EmptyPage fromPage={'myComments'} /> }
        </div>
    )
}

export default MyComments;