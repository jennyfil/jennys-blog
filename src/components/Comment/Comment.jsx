import React, { useState, useEffect, useContext } from 'react';

import style from './comment.module.css';

import context from '../../context/context';
import {ReactComponent as TrashIcon} from '../../assets/icons/trash3.svg';
import Button from '../Button/Button';

const Comment = ({ author, text, created_at, post, _id }) => {
    const {api, user, setPosts} = useContext(context);
    const usr = JSON.parse(user);
    const [name, setName] = useState("");

    useEffect(() => {
        api.getUserById(author)
            .then(data => {
                setName(data.name);
            })
    }, [])

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
            <div className={style.comment}>
                {author && <h3>{name}</h3>}
                <p className={style.text}>{text}</p>
                <div className={style.date}>{new Date(created_at).toLocaleString()}</div>
            </div>
            {author === usr._id && <TrashIcon className={style.icon} onClick={deleteComment} />}
        </div>
    )
}

export default Comment;