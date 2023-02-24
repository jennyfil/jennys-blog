import React, { useContext, useEffect, useState } from "react";
import style from './myComments.module.css';
import Menu from "../../components/Menu/Menu";
import context from "../../context/context";
import EmptyPage from "../../components/EmptyPage/EmptyPage";
import MyComment from "../../components/MyComment/MyComment";
import Pagination from "../../components/Pagination/Pagination";
import usePagination from "../../hooks/usePagination";

const MyComments = () => {
    const {user, api, myComments} = useContext(context);
    const [comments, setComments] = useState(myComments);
    const paginate = usePagination(comments, 16);

    useEffect(() => {
        api.getAllComments()
            .then(data => {
                setComments(data.filter(comment => comment.author._id === JSON.parse(user)._id))
            })
    }, [])

    return (
        <div className={style.container}>
            <Menu from='myComments' />
            <Pagination paginate={paginate} />
            <div className={style.content}>
                { comments.length > 0 && paginate.setPageData().map((comment, i) => <MyComment {...comment} key={comment._id+i} />) }
            </div>
            {comments.length === 0 && <EmptyPage fromPage={'myComments'} /> }
        </div>
    )
}

export default MyComments;