import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import style from './tags.module.css';

import context from "../../context/context";
import { path } from "../../utils/constants";
import ButtonBack from '../../components/ButtonBack/ButtonBack';
import Tag from "../../components/Tag/Tag";

const Tags = () => {
    const {tags} = useContext(context);
    // const [postsByTag, setPostsByTag] = useState([]);

    // useEffect(() => {
    //     posts.forEach(post => {
    //         // console.log(typeof post.tags);
    //         tags.forEach(tag => {
    //             let postTags = tag.split(/[\s,\.!]/);
    //             // console.log(postTags);
    //             // console.log(typeof postTags);

    //             postTags.forEach(el => {
    //                 if(post.tags.includes(el)){
    //                     setPostsByTag(prev => [...prev, post]);
    //                 }
    //             })
    //         })
    //     })
    // }, [])

    return (
        <div className={style.container}>
            <ButtonBack toPath={path + "home"} />

            <div className={style.content}>
                {tags.map((tag, i) => <Link 
                                        className={style.item}
                                        // to={path + `posts/${_id}`}
                                        key={i}>
                                            {tag}
                                    </Link>
                )}
            </div>

        </div>
    )
}

export default Tags;