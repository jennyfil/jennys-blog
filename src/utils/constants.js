// export const path = '/';
export const path = '/jennys-blog/';

export const sortPosts = (data) => {
  return data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const dataFilter = (prev, data) => {
  return prev.map(el => {
      if(el._id === data._id) {
          return data;
      } else {
          return el;
      }
  })
}

export const postData = (data) => {
  if(data) {
      let subText = "";
      let i = data.indexOf(' ', 40);
      subText = data.slice(0, i) + "..";
      return subText;
  }
};

export const Email_RegExp =
  /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const PWD_RegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

export const Message = {
    incorrectEmail: 'Введите корректную почту',
    incorrectPWD: 'Пароль должен содержать 6 символов'
  };