import React, { useContext, useEffect, useState } from 'react';

import style from './postCard.module.css';

import noImg from '../../assets/images/no-image.png';
import ButtonLink from '../ButtonLink/ButtonLink';
import { path, postData, dataFilter } from '../../utils/constants';
import context from '../../context/context';

const PostCard = ({ _id, image, title, likes, comments, author, text, created_at, updated_at }) => {
    const updData =  updated_at.substr(0, 10);
    const data = created_at.substr(0, 10);

    const { api, user, setPosts } = useContext(context);
    const usr = JSON.parse(user);
    const [like, setLike] = useState(false);
    const [cntlikes, setCntLikes] = useState(likes.length);
    const [cntComments, setCntComments] = useState(comments.length);

    useEffect(() => {
        if(likes.length && likes.includes(usr._id)) {
            setLike(true);
        }
    }, [])

    useEffect(() => {
        api.getPostById(_id)
            .then(post => {
                setCntComments(post.comments.length);
            })
    }, [])

    const addLike = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if(likes.filter(el => el === usr._id)) {
            if(like) {
                api.deleteLike(_id)
                    .then(data => {
                        setPosts(prev => dataFilter(prev, data));
                        setCntLikes(data.likes.length);
                        setLike(false);
                    })
            } else {
                api.addLike(_id)
                    .then(data => {
                        setPosts(prev => dataFilter(prev, data));
                        setCntLikes(data.likes.length);
                        setLike(true);
                    });
            }
        }
    }


    return (
        <div className={style.card}>
            <div className={style.sticky} onClick={addLike}>
                { !like 
                    ? <i className="fa-regular fa-heart" /> 
                    : <i className="fa-solid fa-heart" />
                }
                <span>{cntlikes}</span>
            </div>

            <div className={style.image}>
                <img src={image ? image : noImg} alt="Фото поста" />
            </div>

            <div className={style.info}>
                <h3>{title}</h3>

                <div className={style.itemBlock}>
                    <div className={style.item}>
                        <i className="fa-regular fa-pen-to-square" />
                        <span>{author.name}</span>
                    </div>
                    <div className={style.item}>
                        <i className="fa-regular fa-comment" />
                        <span>{cntComments}</span>
                    </div>
                    <div className={style.item}>
                        <i className="fa-regular fa-calendar" />
                        <span>{updData ? updData : data}</span>
                    </div>
                </div>

                <div className={style.text}>
                    {postData(text)}
                </div>

                <ButtonLink className={style.btn} btnText="Читать.." toPath={path + `posts/${_id}`} />
            </div>
            
        </div>
    )
}

export default PostCard;