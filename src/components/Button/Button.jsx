import style from './button.module.css';

const Button = ({ btnText, onClick,type }) => {
    return (
        <div>
            <button className={style.btn} onClick={onClick} type={type}>
                {btnText}
            </button>
        </div>

    )
}

export default Button;