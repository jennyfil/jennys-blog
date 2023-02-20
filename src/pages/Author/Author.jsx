import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import style from './author.module.css';

import { path } from '../../utils/constants';
import { useParams } from 'react-router-dom';
import context from '../../context/context';
import ButtonBack from '../../components/ButtonBack/ButtonBack';

const Author = () => {
    const {id} = useParams();
    const {api} = useContext(context);

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
            // api.getAllPosts()
            //     .then(posts => {
            //         console.log(posts[0].author._id);
            //         setUserPosts(posts.filter(el => el.author._id === id));
            //         console.log(id);
            //     })
        }
    }, [])



    return (
        <div className={style.container}>
            <ButtonBack toPath={path + "authors"} />

            <div className={style.content}>

                <p className={style.page_title}>Профиль пользователя</p>

                {/* {userPosts.length > 0 && <div className={style.posts}>
                    <h3>Посты автора</h3>
                    { userPosts.map(post => <div>
                                                <Link toPath={path + `posts/${post._id}`}>
                                                    {post.title}
                                                </Link>
                                            </div>)
                    }
                </div>} */}

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
        </div>
    )
}

export default Author;