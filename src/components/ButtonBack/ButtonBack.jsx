import React from 'react';
import { Link } from 'react-router-dom';
import style from './buttonBack.module.css';

const ButtonBack = ({ toPath, btnText }) => {
    return (
        <Link className={style.btnLink} to={toPath}>
            <i className="fa-solid fa-angle-left" /> {btnText === 'На главную' ? btnText : 'Назад'}
        </Link>
    )
}

export default ButtonBack;