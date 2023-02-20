import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';

import style from './style.module.css';

import Button from '../Button/Button';
import ButtonLink from '../ButtonLink/ButtonLink';
import { Email_RegExp, PWD_RegExp, Message } from '../../utils/constants';
import authForm from '../../context/authForm';
import { ReactComponent as VisibleEyeIcon } from '../../assets/icons/eye-fill.svg';
import { ReactComponent as NotVisibleEyeIcon } from '../../assets/icons/eye-slash-fill.svg';


const RegistrationForm = ({ formHandler }) => {
    const {email, setEmail, password, setPassword, confirmPwd, setConfirmPwd, auth, setAuth} = useContext(authForm);
    const [testPwd, setTestPwd] = useState(true);
    const [visiblePwd, setVisiblePwd] = useState(false);
    const [visibleConfirmPwd, setVisibleConfirmPwd] = useState(false);

    const {register, handleSubmit, formState: { errors }} = useForm({ mode: 'onBlur' });

    const checkPwd = (val, type='main') => {
        type === 'main' ? setPassword(val) : setConfirmPwd(val);
        if(val) {
            if(type === 'main') {
                setTestPwd(val !== confirmPwd);
            } else {
                setTestPwd(val !== password);
            }
        }
    }


    return (
        <form onSubmit={handleSubmit(formHandler)}>
            <h3 className={style.form_header}>Зарегистрироваться</h3>
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
                    { errors?.password && <div className={style.error}>{errors.password.message || 'Error!'}</div> }

                    { visiblePwd
                        ? <VisibleEyeIcon className={style.eye} onClick={() => setVisiblePwd(prev => !prev)} />
                        : <NotVisibleEyeIcon className={style.eye} onClick={() => setVisiblePwd(prev => !prev)} />
                    }
                </div>

                <div className={style.pos_rel}>
                    <input
                        {...register('checkPassword', {
                            required: 'Поле обязательно для заполнения',
                        })}
                        type={visibleConfirmPwd ? 'text' : 'password'}
                        placeholder='Повторить пароль'
                        value={confirmPwd}
                        onChange={(e) => {checkPwd(e.target.value, 'secondary')}}
                    />
                    { errors?.checkPassword && <div className={style.error}>{errors.checkPassword.message || 'Error!'}</div> }

                    { visibleConfirmPwd
                        ? <VisibleEyeIcon className={style.eye} onClick={() => setVisibleConfirmPwd(prev => !prev)} />
                        : <NotVisibleEyeIcon className={style.eye} onClick={() => setVisibleConfirmPwd(prev => !prev)} />
                    }
                </div>

            <Button type='submit' btnText='Зарегистрироваться' />
            <ButtonLink type='button' onClick={() => setAuth(!auth)} btnText='Войти' />
        </form>
    )
}

export default RegistrationForm;