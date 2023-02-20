import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import style from './authors.module.css';

import context from "../../context/context";
import { path } from "../../utils/constants";
import ButtonBack from '../../components/ButtonBack/ButtonBack';

const Authors = () => {
    const {authors} = useContext(context);

    const authorsFiltered = authors.filter(el => el.name !== "Иван Иванов" && el.name !== "123" && el.name !== "12345");

    return (
        <div className={style.container}>
            <ButtonBack toPath={path + "home"} />

            <div className={style.content}>
                {authorsFiltered.map((author) => <Link 
                                            className={style.item}
                                            to={path + `author/${author._id}`}
                                            key={author._id}
                                        >
                                                {author.name}
                                        </Link>
                )}
            </div>

        </div>
    )
}

export default Authors;