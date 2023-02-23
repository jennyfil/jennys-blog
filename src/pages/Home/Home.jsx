import React, { useContext, useEffect, useState } from "react";

import style from './home.module.css';

import PostList from "../../components/PostList/PostList";
import Search from "../../components/Search/Search";
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import { path } from "../../utils/constants";
import context from '../../context/context';

const Home = () => {
    const { posts, searchQuery, postsByText} = useContext(context);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        if(postsByText.length) {
            setFlag(true);
        }else {
            setFlag(false);
        }
    }, [posts]);

    return (
        <div className={style.home}>

            <div className={style.top_menu}>
                <div className={style.menu_block}>
                    <ButtonLink btnText='Авторы' toPath={path + "authors"} />
                </div>
                <Search />
            </div>

            <div className={style.content}>
                <PostList posts={searchQuery ? postsByText : posts} />
                {searchQuery && !flag && <p>По вашему запросу посты не найдены</p>}
            </div>

        </div>
    )
}

export default Home;