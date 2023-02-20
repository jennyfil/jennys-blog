import React, { useContext, useEffect, useState } from 'react';

import style from './author.module.css';

import { path } from '../../utils/constants';
import { useParams } from 'react-router-dom';
import context from '../../context/context';

const Author = () => {
    const {id} = useParams();
    const {api} = useContext(context);

    const [userName, setUserName] = useState('');
    const [userAbout, seUserAbout] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [userEmail, setUserEmail] = useState('');

    // const [userPosts, setUserPosts] = useState([]);


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


    return (
        <div className={style.container}>
            <p className={style.page_title}>Профиль пользователя</p>

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
    )
}

export default Author;