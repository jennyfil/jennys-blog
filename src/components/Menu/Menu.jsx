import React from 'react';

import style from './menu.module.css';

import ButtonLink from '../../components/ButtonLink/ButtonLink';
import { path } from '../../utils/constants';
import Search from '../../components/Search/Search';

const Menu = () => {

    return (
        <div className={style.menu}>
            <div className={style.btn_block}>
                <ButtonLink btnText='Мои посты' toPath={path + "my-posts"} />
                <ButtonLink btnText='Избранные посты' toPath={path + "favorite"} />
                <ButtonLink btnText='Мои комментарии' toPath={path + "my-comments"} />
            </div>

            <Search />
        </div>
    )
}

export default Menu;