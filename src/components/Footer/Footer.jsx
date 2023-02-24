import style from './footer.module.css';

const Footer = ({ year }) => {
    return (
        <footer className={style.footer}>
            <span>©️ Jenny`s blog, {year} г</span>
        </footer>
    )
}

export default Footer;