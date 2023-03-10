import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from './addPost.module.css';
import context from '../../context/context';
import Button from '../../components/Button/Button';
import ButtonBack from '../../components/ButtonBack/ButtonBack';
import noImg from '../../assets/images/no-image.png';
import { path } from '../../utils/constants';

const AddPost = () => {
    const {api, setPosts} = useContext(context);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
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

    const addPost = (e) => {
        e.preventDefault();
        const body = {
            title: title,
            text: text,
        }
        if(image) {body.image = image}
        if(id) {
            api.modifyPostById(id, body)
                .then(data => {
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
    }, [id, api])

    return (
        <div className={style.container}>
            <ButtonBack toPath={id ? `${path}posts/${id}` : `${path}home`} />
            
            <form className={style.addPost_form} onSubmit={addPost}>
                <h2 className={style.heading}>
                    {!id ? '?????????? ????????' : '???????????????? ????????'}
                </h2>
                <div className={style.item}>
                    <label htmlFor="title">??????????????????</label>
                    <input 
                        required
                        id="title"
                        placeholder="?????????????????? ??????????"
                        value={title}
                        onInput={(e) => setTitle(e.target.value)} />
                </div>
                <div className={style.item}>
                    <label htmlFor="image">??????????????????????</label>
                    <input
                        id="image"
                        placeholder="???????????? ???? ??????????????????????"
                        value={image}
                        onInput={(e) => setImage(e.target.value)} />
                </div>
                <div className={style.img}>
                    <img src={image ? image : noImg} alt="?????????????????????? ?? ??????????" />
                </div>
                <div className={style.item}>
                    <label htmlFor="text">??????????</label>
                    <textarea
                        required
                        id="text"
                        placeholder="?????????? ??????????"
                        value={text}
                        onInput={(e) => setText(e.target.value)} />
                </div>
                <div>
                    <Button btnText={!id ? "?????????????? ????????" : "???????????????? ????????"} type="submit" />
                </div>
            </form>
        </div>
    )
}

export default AddPost;