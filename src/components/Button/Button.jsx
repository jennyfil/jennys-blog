import style from './button.module.css';

const Button = ({ btnText, onClick,type }) => {
    return (
        <button className={style.btn} onClick={onClick} type={type}>
            {btnText}
        </button>
    )
}

export default Button;