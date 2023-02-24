import React from 'react';
import style from './menu.module.css';
import ButtonLink from '../ButtonLink/ButtonLink';
import ButtonLinkActive from '../ButtonLinkActive/ButtonLinkActive';
import { path } from '../../utils/constants';

const Menu = ({from}) => {
    return (
        <div className={style.menu}>
            <div className={style.btn_block}>
                {from === 'myPosts'
                ? <ButtonLinkActive btnText='Мои посты' toPath={path + "my-posts"} />
                :  <ButtonLink btnText='Мои посты' toPath={path + "my-posts"} />
                }

                {from === 'fav'
                ? <ButtonLinkActive btnText='Избранные посты' toPath={path + "favorite"} />
                :  <ButtonLink btnText='Избранные посты' toPath={path + "favorite"} />
                }

                {from === 'myComments'
                ? <ButtonLinkActive btnText='Мои комментарии' toPath={path + "my-comments"} />
                :  <ButtonLink btnText='Мои комментарии' toPath={path + "my-comments"} />
                }
            </div>
        </div>
    )
}

export default Menu;