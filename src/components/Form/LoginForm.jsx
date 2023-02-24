import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import style from './style.module.css';
import Button from '../Button/Button';
import ButtonLink from '../ButtonLink/ButtonLink';
import { Email_RegExp, PWD_RegExp, Message } from '../../utils/constants';
import authForm from '../../context/authForm';
import { ReactComponent as VisibleEyeIcon } from '../../assets/icons/eye-fill.svg';
import { ReactComponent as NotVisibleEyeIcon } from '../../assets/icons/eye-slash-fill.svg';

const LoginForm = ({ formHandler }) => {
    const {email, setEmail, password, setPassword, auth, setAuth} = useContext(authForm);
    const {register, handleSubmit, formState: { errors }} = useForm({ mode: 'onBlur' });
    const [visiblePwd, setVisiblePwd] = useState(false);

    return (
        <form onSubmit={handleSubmit(formHandler)}>
            <h3 className={style.form_header}>Войти</h3>
            <input 
                {...register('email', {
                    required: 'Поле обязательно для заполнения',
                    pattern: { 
                        value: Email_RegExp, 
                        message: Message.incorrectEmail 
                    }
                })}
                type='email'
                placeholder='Введите вашу почту'
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
            />
            { errors?.email && <div className={style.error}>{errors.email.message || 'Error!'}</div> }

            <div className={style.pos_rel}>
                <input
                    {...register('password', {
                        required: 'Поле обязательно для заполнения',
                        pattern: { 
                            value: PWD_RegExp, 
                            message: Message.incorrectPWD 
                        }
                    })}
                    type={visiblePwd ? 'text' : 'password'}
                    placeholder='Пароль'
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                />

                { visiblePwd
                    ? <VisibleEyeIcon className={style.eye} onClick={() => setVisiblePwd(prev => !prev)} />
                    : <NotVisibleEyeIcon className={style.eye} onClick={() => setVisiblePwd(prev => !prev)} />
                }

                { errors?.password && <div className={style.error}>{errors.password.message || 'Error!'}</div> }
            </div>

            <Button type='submit' btnText='Войти' />
            <ButtonLink type='button' onClick={() => setAuth(!auth)} btnText='Зарегистрироваться' />
        </form>
    )
}

export default LoginForm;