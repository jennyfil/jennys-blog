import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import style from './addPost.module.css';

import context from '../../context/context';
import Button from '../../components/Button/Button';
import ButtonBack from '../../components/ButtonBack/ButtonBack';
import noImg from '../../assets/images/no-image.png';
import { path, sortPosts } from '../../utils/constants';


const AddPost = () => {
    const {api, setPosts} = useContext(context);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    // const [tag, setTag] = useState('');
    // const [tags, setTags] = useState([]);

    const navigate = useNavigate();
    const {id} = useParams();

    const postDataFilter = (data) => {
        if(!data.err) {
            setPosts(prev => prev.map(el => {
                if(el._id === data._id) {
                    return data;
                } else {
                    return el;
                }
            }));
            clear();
            navigate(path + `posts/${data._id}`);
        }
    }

    const formHandler = (e) => {
        e.preventDefault();
        const body = {
            title: title,
            text: text,
        }

        if(image) {body.image = image}

        if(id) {
            api.modifyPostById(id, body)
                .then(data => {
                    console.log(data);
                    postDataFilter(data);
                })
        } else {
            api.addPost(body)
                .then(data => postDataFilter(data))
        }
    }

    const clear = () =>{
        setTitle('');
        setText('');
        setImage('');
    }

    useEffect(() => {
        if(id) {
            api.getPostById(id)
                .then(data => {
                    setTitle(data.title);
                    setText(data.text);
                    setImage(data.image);
                })
        }
    }, [])

    return (
        <>
            <ButtonBack toPath={id ? `${path}posts/${id}` : `${path}home`} />
            
            <form className={style.addPost_form} onSubmit={formHandler}>
                <h2 className={style.heading}>
                    {!id ? 'Новый пост' : 'Изменить пост'}
                </h2>

                <div className={style.item}>
                    <label htmlFor="title">Заголовок</label>
                    <input 
                        required
                        id="title"
                        placeholder="Заголовок поста"
                        value={title}
                        onInput={(e) => setTitle(e.target.value)} />
                </div>

                <div className={style.item}>
                    <label htmlFor="image">Изображение</label>
                    <input
                        id="image"
                        placeholder="Ссылка на изображение"
                        value={image}
                        onInput={(e) => setImage(e.target.value)} />
                </div>
                <div className={style.img}>
                    <img src={image ? image : noImg} alt="Изображение к посту" />
                </div>

                <div className={style.item}>
                    <label htmlFor="text">Текст</label>
                    <textarea
                        required
                        id="text"
                        placeholder="Текст поста"
                        value={text}
                        onInput={(e) => setText(e.target.value)} />
                </div>

                <div>
                    <Button btnText={!id ? "Создать пост" : "Изменить пост"} type="submit" />
                </div>
            </form>

        </>
    )
}

export default AddPost;