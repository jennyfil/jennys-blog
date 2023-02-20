import style from './buttonLink.module.css';

import React from 'react';
import { Link } from 'react-router-dom';


const ButtonLink = ({ toPath, onClick, btnText }) => {
    return (
        <Link className={style.btnLink} to={toPath} onClick={onClick}>
            {btnText}
        </Link>
    )
}

export default ButtonLink;