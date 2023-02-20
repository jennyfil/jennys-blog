import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import style from './header.module.css';

import { path } from '../../utils/constants';
import context from '../../context/context';


const Header = () => {
    const {user, setUser, setToken, setLoggedIn} = useContext(context);
    const navigate = useNavigate();

    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser('');
        setToken('');
        setLoggedIn(false);
        navigate(path);
    }

    return (
        <header>
            <nav>
                {!user && <Link onClick={() => setLoggedIn(prev => !prev)}>Войти</Link>}

                {user && <>
                    <Link to={path + 'home'}>Home</Link>
                    <Link to={path + 'add'}>Создать пост</Link>
                    <Link to={path + "profile"}>Мой профиль</Link>
                    <Link to={path} onClick={logOut} >Выйти</Link>
                </>}
            </nav>
            
        </header>
    )
}

export default Header;