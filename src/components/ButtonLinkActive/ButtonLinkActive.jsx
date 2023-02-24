import style from './buttonLinkActive.module.css';
import React from 'react';
import { Link } from 'react-router-dom';

const ButtonLinkActive = ({ toPath, onClick, btnText }) => {
    return (
        <Link className={style.btnLink} to={toPath} onClick={onClick}>
            {btnText}
        </Link>
    )
}

export default ButtonLinkActive;