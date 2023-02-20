import style from './emptyPage.module.css';

import img from '../../assets/images/emptyPage.jpg';

const EmptyPage = ({ fromPage }) => {
    return (
        <div className={style.container}>
            <img src={img} alt="Изображение-заглушка" />
            { fromPage === 'myPosts' && <p className={style.text}>Добавьте, пожалуйста, новый пост</p> }
            { fromPage === 'favorite' && <p className={style.text}>Вы ещё не добавили любимые посты</p> }
            { fromPage === 'myComments' && <p className={style.text}>Вы ещё не оставили ни одного комментария</p> }
        </div>
    )
}

export default EmptyPage;