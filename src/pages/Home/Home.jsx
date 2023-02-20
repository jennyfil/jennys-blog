import React, { useContext } from "react";

import style from './home.module.css';

import PostList from "../../components/PostList/PostList";
import Search from "../../components/Search/Search";
import ButtonLink from '../../components/ButtonLink/ButtonLink';
import { path } from "../../utils/constants";
import context from '../../context/context';


const Home = () => {
    const {posts} = useContext(context);

    return (
        <div className={style.home}>

            <div className={style.top_menu}>
                <div className={style.menu_block}>
                    <ButtonLink btnText='Авторы' toPath={path + "authors"} />
                    <ButtonLink btnText='Теги' />
                </div>
                <Search />
            </div>

            <div className={style.content}>
                <PostList posts={posts} />
            </div>

        </div>
    )
}

export default Home;