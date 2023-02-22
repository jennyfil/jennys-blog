import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import style from './tag.module.css';

import context from "../../context/context";
import { path } from "../../utils/constants";

const Tag = () => {
    const {tags, posts} = useContext(context);
    const [postsByTag, setPostsByTag] = useState([]);

    useEffect(() => {
        posts.forEach(post => {
            tags.forEach(tag => {
                let postTags = tag.split(/[\s,\.!]/);

                postTags.forEach(el => {
                    if(post.tags.includes(el)){
                        setPostsByTag(prev => [...prev, post]);
                    }
                })
            })
        })
    }, [])

    return (
        <div className={style.container}>
            {postsByTag.map((post, i) => <div key={post._id + i}>
                
            </div>)}
            
        </div>
    )
}

export default Tag;