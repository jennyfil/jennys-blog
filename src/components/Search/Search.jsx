import React, { useContext, useEffect, useState } from 'react';

import { ReactComponent as IconSearch } from '../../assets/icons/search.svg';
import { ReactComponent as IconClose } from '../../assets/icons/x-lg.svg';
import style from './search.module.css';
import context from '../../context/context';
import { sortPosts } from '../../utils/constants';

const Search = () => {
    const {posts, searchQuery, setSearchQuery, setPostsByText} = useContext(context);

    const search = (e) =>{
        setSearchQuery(e.target.value);
        setPostsByText(posts.filter(p => p.text.toLowerCase().includes(e.target.value.toLowerCase())));
    }


    return (
        <div className={style.search} >
            <input 
                className={style.input}
                placeholder="Поиск.."
                value={searchQuery}
                onInput={search}
            />
            {searchQuery
                ? <IconClose className={style.cross} onClick={() => setSearchQuery('')} />
                : <IconSearch className={style.loupe}/>
            }

        </div>
    )
}

export default Search;