import React, { useContext } from 'react';

import style from './myComment.module.css';

import context from '../../context/context';
import {ReactComponent as TrashIcon} from '../../assets/icons/trash3.svg';
import ButtonLink from '../ButtonLink/ButtonLink';
import { path } from '../../utils/constants';

const MyComment = ({ text, created_at, post, _id }) => {
    const {api, setPosts} = useContext(context);

    const deleteComment = () => {
        api.deleteComment(post, _id)
            .then(data => {
                if(!data.error) {
                    setPosts(prev => prev.filter(post => post._id !== data._id));
                }
            })
    }

    return (
        <div className={style.container}>
            <TrashIcon className={style.icon} onClick={deleteComment} />

            <div className={style.comment}>
                <p className={style.text}>{text}</p>
                <div className={style.date}>{new Date(created_at).toLocaleString()}</div>
            </div>

            <div className={style.btnLink}>
                <ButtonLink toPath={path + `posts/${post}`} btnText={'Перейти к посту'}/>
            </div>

        </div>
    )
}

export default MyComment;