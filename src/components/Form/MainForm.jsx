import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import style from './style.module.css';

import LoginForm from './LoginForm';
import RegistrationForm from './RegistrationForm';
import { ReactComponent as CloseIcon } from '../../assets/icons/x-lg.svg';
import context from "../../context/context";
import AuthForm from "../../context/authForm";
import { path } from "../../utils/constants";


const MainForm = ({ type }) => {
    const {api, loggedIn, setLoggedIn, setToken, user, setUser} = useContext(context);
    const [auth, setAuth] = useState(type === 'auth');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');

    const navigate = useNavigate();

    const closeForm = () => {
        setLoggedIn(false);
        setEmail('');
        setPassword('');
    }

    const formHandler = () => {
        const body = {
            email: email,
            password: password
        }
        let result;
        if(type === 'auth') {
            result = api.signIn(body)
        } else {
            result = api.signUp(body)
        }
        result
            .then(data => {
                if(data.message) {
                    alert(data.message);
                } else {
                    if(!auth) {
                        api.signIn(body)
                            .then(data => {
                                // console.log(data);
                                setToken(data.token);
                                setUser(JSON.stringify(data.data));
                                localStorage.setItem("token", data.token);
                                localStorage.setItem("user", JSON.stringify(data.data));
                            })
                    } else {
                        setToken(data.token);
                        setUser(JSON.stringify(data.data));
                        localStorage.setItem("token", data.token);
                        localStorage.setItem("user", JSON.stringify(data.data));

                    }
                    navigate(path + "home");
                }
                setLoggedIn(false);
                setEmail('');
                setPassword('');
            })
    }

    return (
        <AuthForm.Provider value={{
            email,
            setEmail,
            password,
            setPassword,
            confirmPwd,
            setConfirmPwd,
            auth,
            setAuth
        }}>
            <div className={loggedIn ? `${style.modal_container} ${style.d_flex}` : style.modal_container}>
                <div className={style.modal}>
                    <CloseIcon className={style.modal_close} onClick={closeForm} />
                    { auth 
                    ? <LoginForm formHandler={formHandler} />
                    : <RegistrationForm formHandler={formHandler} />
                    }
                </div>
            </div>
        </AuthForm.Provider>

    )
}

export default MainForm;