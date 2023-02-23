import style from './confirm.module.css';

import { ReactComponent as CloseIcon } from '../../assets/icons/x-lg.svg';
import Button from '../../components/Button/Button';


const Confirm = ({ deleteHandler, closeForm }) => {
    return (
        <div className={style.modal_container}>
            <div className={style.modal}>
                <CloseIcon className={style.modal_close} onClick={closeForm} />

                <p>Подтвердите удаление</p>
                <div className={style.answer}>
                    <Button btnText="Удалить" onClick={deleteHandler} />
                    <Button btnText="Отменить" onClick={closeForm} />
                </div>
            </div>
        </div>
    )
}

export default Confirm;