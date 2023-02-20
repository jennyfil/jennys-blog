import React, { useContext, useState } from 'react';

import { ReactComponent as IconSearch } from '../../assets/icons/search.svg';
import { ReactComponent as IconClose } from '../../assets/icons/x-lg.svg';
import style from './search.module.css';
// import context from '../../context/context';
// import { sortPosts } from '../../utils/constants';

const Search = ({ onSearch }) => {
    // const {api, setPosts} = useContext(context);
    const [text, setText] = useState('');


    const search = (e) =>{
        // e.preventDefault();
        setText(e.target.value);
        onSearch(text);
    }

    return (
        <div className={style.search} >
            <input 
                // onChange={(e) => setSearchQuery(e.target.value)}
                className={style.input}
                placeholder="Поиск.."
                value={text}
                onInput={search}
            />
            {text
                ? <IconClose className={style.cross} onClick={() => {
                    setText('');
                    onSearch('');
                }} />
                : <IconSearch className={style.loupe}/>
            }
        </div>
    )
}

export default Search;