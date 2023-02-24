import React from 'react';
import style from './myComment.module.css';
import ButtonLink from '../ButtonLink/ButtonLink';
import { path } from '../../utils/constants';

const MyComment = ({ text, created_at, post }) => {
    return (
        <div className={style.container}>
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