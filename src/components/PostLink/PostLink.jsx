import React from 'react';
import { Link } from 'react-router-dom';

import style from './postLink.module.css';
import { path } from '../../utils/constants';

const PostLink = ({ _id, title, image }) => {
    return (
            <Link className={style.postLink} to={path + `posts/${_id}`}>
                <div className={style.img}>
                    <img src={image} alt="Изображение к посту" />
                </div>
                <div className={style.title} >{title}</div>
            </Link>
    

        // <div className={style.postLink}>
        //     <div className={style.img}>
        //         <img src={image} alt="Изображение к посту" />
        //     </div>
        //     <Link className={style.title} to={path + `posts/${_id}`}>
        //         {title}
        //     </Link>
        // </div>
    )
}

export default PostLink;