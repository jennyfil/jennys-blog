import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import style from './addComment.module.css';

import context from '../../context/context';
import { path } from '../../utils/constants';
import Button from '../Button/Button';
import ButtonLink from '../ButtonLink/ButtonLink';


const AddComment = ({ id, setPost, setCntComments }) => {
    const {api} = useContext(context);
    const [active, setActive] = useState(false);
    const [newComment, setNewComment] = useState("");
    const navigate = useNavigate();


    const addComment = (e) => {
        e.preventDefault();
        let body = {
            text: newComment
        }
        api.addComment(id, body)
            .then(data => {
                setPost(data);
                setCntComments(data.comments.length);
                setNewComment("");
                setActive(false);
                navigate(path + `posts/${id}`);
            })
    }

    return (
        <div className={style.container}>
            <ButtonLink btnText='Оставить комментарий' onClick={() => setActive(!active)} />

            <form onSubmit={addComment} className={active ? style.visible : style.not_visible}>
                <textarea value={newComment} onInput={e => setNewComment(e.target.value)} />
                <div>
                    <Button type="submit" btnText='Отправить' />
                </div>
            </form>
        </div>
    )
}

export default AddComment;