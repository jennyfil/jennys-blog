import React from 'react';

import style from './pagination.module.css';

import { ReactComponent as CaretRight } from '../../assets/icons/caret-right-fill.svg';
import { ReactComponent as CaretLeft } from '../../assets/icons/caret-left-fill.svg';


const Pagination = ({ paginate }) => {
    const max = paginate.maxPage;
    const current = paginate.currentPage;
    const pages = [];

    for(let i=0; i<max; i++) {
        pages.push(i+1);
    }

    return (
        <div className={style.container}>
            <button className={style.page} disabled={current === 1} onClick={paginate.previous}>
                <CaretLeft />
            </button>

            {pages.map(p => <button 
                                className={p === current ? `${style.page} ${style.active}` : style.page}
                                key={p}
                                onClick={e => {paginate.step(p)}}>{p}
                            </button>)
            }

            <button className={style.page} disabled={current === max} onClick={paginate.next}>
                <CaretRight />
            </button>
        </div>
    )
}

export default Pagination;