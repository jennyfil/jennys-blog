import React, { useContext, useEffect, useState } from 'react';

import style from './profile.module.css';

import {ReactComponent as PencilIcon} from '../../assets/icons/pencil-fill.svg';
import {ReactComponent as CheckIcon} from '../../assets/icons/check-lg.svg';
import {ReactComponent as CloseIcon} from '../../assets/icons/x-lg.svg';
import context from '../../context/context';
import noImg from '../../assets/images/no-image.png';
import Menu from '../../components/Menu/Menu';

const Profile = () => {
    const {user, setUser, api} = useContext(context);
    const usr = JSON.parse(user);
    const [userInfo, setUserInfo] = useState(usr);

    const [nameFlag, setNameFlag] = useState(false);
    const [name, setName] = useState(userInfo.name);
    const [aboutflag, setAboutFlag] = useState(false);
    const [about, setAbout] = useState(userInfo.about);
    const [imgFlag, setImgFlag] = useState(false);
    const [img, setImg] = useState(userInfo.avatar);


    useEffect(() => {
        api.getUserById(usr._id)
            .then(userdata => {
                setUserInfo(userdata);
            })
    }, [user])

    const updUser = () => {
        api.updUserInfo({
            name: name,
            about: about
        })
            .then(data => {
                setUser(JSON.stringify(data));
                localStorage.setItem("user", JSON.stringify(data));
                setNameFlag(false);
                setAboutFlag(false);
            })
    }

    const updImg = () => {        
        api.updUserInfo({avatar: img}, true)
            .then(data => {
                setUser(JSON.stringify(data));
                localStorage.setItem("user", JSON.stringify(data));
                setImgFlag(false);
            })
    }

    return (
        <div className={style.container}>
            <Menu />

            <div className={style.content}>
                <h2>Обо мне</h2>
                <div className={style.image}>
                    <img src={userInfo.avatar ? userInfo.avatar : noImg} alt="Фото профиля" />

                    { !imgFlag 
                    ? <div className={style.change_block}>
                        <div className={style.text} onClick={() => setImgFlag(true)}>
                            Изменить
                        </div>
                    </div>
                    : <div className={style.change_block}>
                        <input className={style.input_upd_img} type="text" value={img} onChange={e => setImg(e.target.value)} />
                        <CheckIcon className={style.icons} onClick={updImg} />
                        <CloseIcon className={style.icons} onClick={() => {
                            setImg(userInfo.avatar);
                            setImgFlag(false);
                        }} />
                    </div>
                    }
                </div>

                <table>
                    <tbody>
                        <tr>
                            <td>Имя:</td>
                            <td>
                                { !nameFlag 
                                ? <div className={style.change_block}>
                                    <div>{userInfo.name}</div>
                                    <PencilIcon className={style.icons} onClick={() => setNameFlag(true)} />
                                </div>
                                : <div className={style.change_block}>
                                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                                    <CheckIcon className={style.icons} onClick={updUser} />
                                    <CloseIcon className={style.icons} onClick={() => {
                                        setName(userInfo.name);
                                        setNameFlag(false);
                                    }} />
                                </div>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Статус:</td>
                            <td>
                                { !aboutflag 
                                    ? <div className={style.change_block}>
                                        <div>{userInfo.about}</div>
                                        <PencilIcon className={style.icons} onClick={() => setAboutFlag(true)} />
                                    </div>
                                    : <div className={style.change_block}>
                                        <input type="text" value={about} onChange={e => setAbout(e.target.value)} />
                                        <CheckIcon className={style.icons} onClick={updUser} />
                                        <CloseIcon className={style.icons} onClick={() => {
                                            setAbout(userInfo.about);
                                            setAboutFlag(false);
                                        }} />
                                    </div>
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Почта:</td>
                            <td><a href={`mailto:${userInfo.email}`}> {userInfo.email}</a></td>
                        </tr>
                    </tbody>

                </table>

            </div>

        </div>
    )
}

export default Profile;