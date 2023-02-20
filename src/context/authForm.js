import React from "react";

export default React.createContext({
    email: '',
    setEmail: () => {},
    password: '',
    setPassword: () => {},
    confirmPwd: '',
    setConfirmPwd: () => {},
    auth: true,
    setAuth: () => {}
})