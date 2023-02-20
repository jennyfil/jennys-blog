import React, { useContext } from "react";
import { Link } from "react-router-dom";

import style from './tags.module.css';

import context from "../../context/context";
import { path } from "../../utils/constants";
import ButtonBack from '../../components/ButtonBack/ButtonBack';

const Tags = () => {
    const {tags} = useContext(context);


    return (
        <div className={style.container}>
            <ButtonBack toPath={path + "home"} />

            <div className={style.content}>

                {tags.map((tag, i) => <Link 
                                        className={style.item}
                                        // to={path + `author/${author._id}`}
                                        key={i}>
                                            {tag}
                                    </Link>
                )}
            </div>

        </div>
    )
}

export default Tags;