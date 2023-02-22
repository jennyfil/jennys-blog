import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import style from './author.module.css';

import { path } from '../../utils/constants';
import { useParams } from 'react-router-dom';
import context from '../../context/context';
import ButtonBack from '../../components/ButtonBack/ButtonBack';
import PostLink from '../../components/PostLink/PostLink';

const Author = () => {
    const {id} = useParams();
    const {api, posts} = useContext(context);

    const [userName, setUserName] = useState('');
    const [userAbout, seUserAbout] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [userEmail, setUserEmail] = useState('');

    const [userPosts, setUserPosts] = useState([]);


    useEffect(() => {
        if(id) {
            api.getUserById(id)
                .then(userData => {
                    setUserName(userData.name);
                    seUserAbout(userData.about);
                    setUserAvatar(userData.avatar);
                    setUserEmail(userData.email);
                })
        }
    }, [])

    useEffect(() => {
        posts.forEach(post => {
            if(post.author._id === id) {
                setUserPosts(prev => [...prev, post]);
            }
        })
    }, [posts])


    return (
        <div className={style.container}>
            <ButtonBack toPath={path + "authors"} />

            <div className={style.content}>
                <p className={style.page_title}>Профиль пользователя</p>

                <div className={style.info}>
                    <div className={style.image}>
                        <img src={ userAvatar } alt="Фото профиля" />
                    </div>
                    
                    <table>
                        <tbody>
                            <tr>
                                <td>Имя:</td>
                                <td>{ userName }</td>
                            </tr>
                            <tr>
                                <td>Статус:</td>
                                <td>{ userAbout }</td>
                            </tr>
                            <tr>
                                <td>Почта:</td>
                                <td><a href={`mailto:${userEmail}`}> {userEmail}</a></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className={style.posts_title}>Посты автора</p>
                { userPosts.length > 0 && <div className={style.posts}>
                    { userPosts.map((post, i) => <PostLink key={post._id + i} {...post} />) }
                </div> }

            </div>
        </div>
    )
}

export default Author;