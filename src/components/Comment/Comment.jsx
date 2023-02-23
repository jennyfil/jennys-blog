import React, { useState, useEffect, useContext } from 'react';

import style from './comment.module.css';

import context from '../../context/context';
import {ReactComponent as TrashIcon} from '../../assets/icons/trash3.svg';
import Confirm from '../Confiirm/Confirm';

const Comment = ({ author, text, created_at, post, _id, setCntComments, setPost }) => {
    const {api, user, setPosts} = useContext(context);
    const usr = JSON.parse(user);
    const [name, setName] = useState("");
    const [active, setActive] = useState(false);


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
                    // setPost(data);
                    setPosts(prev =>  prev.map(post => {
                            return post._id === data._id ? data : post;
                        }));
                    setCntComments(data.comments.length);
                }
            })
    }

    const confirmDelete = () => {
        setActive(true);
    }

    const closeForm = () => {
        setActive(false);
    }

    return (
        <div className={style.container}>
            <div className={style.comment}>
                {author && <h3>{name}</h3>}
                <p className={style.text}>{text}</p>
                <div className={style.date}>{new Date(created_at).toLocaleString()}</div>
            </div>
            {author === usr._id && <TrashIcon className={style.icon} onClick={confirmDelete} />}

            { active && <Confirm deleteHandler={deleteComment} closeForm={closeForm} /> }
        </div>
    )
}

export default Comment;