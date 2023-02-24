import React, { useContext } from "react";
import { Link } from "react-router-dom";
import style from './authors.module.css';
import context from "../../context/context";
import { path } from "../../utils/constants";
import ButtonBack from '../../components/ButtonBack/ButtonBack';

const Authors = () => {
    const {authors} = useContext(context);

    return (
        <div className={style.container}>
            <ButtonBack toPath={path + "home"} />
            <div className={style.content}>
                {authors.map((author) => <Link 
                    className={style.item}
                    to={path + `author/${author._id}`}
                    key={author._id}>
                        <div className={style.img}> 
                            <img src={author.avatar} alt="Фото пользователя" />
                        </div>
                        {author.name}
                </Link>                     
                )}
            </div>
        </div>
    )
}

export default Authors;