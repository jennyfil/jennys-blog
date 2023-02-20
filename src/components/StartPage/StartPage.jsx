import style from './startPage.module.css';

import bg from '../../assets/images/bg.jpg';


const StartPage = () => {
    return (
        <div className={style.container}>
            {bg && <img src={bg} />}
            <div className={style.box}>
                <p className={style.overText}>Расскажите о своих увлечениях</p>
            </div>
        </div>
    )
}

export default StartPage;