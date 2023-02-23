import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import style from './post.module.css';

import context from '../../context/context';
import { path, dataFilter } from '../../utils/constants';
import {ReactComponent as PencilIcon} from '../../assets/icons/pencil-square.svg';
import {ReactComponent as TrashIcon} from '../../assets/icons/trash3.svg';
import ButtonBack from '../../components/ButtonBack/ButtonBack';
import AddComment from '../../components/AddComment/AddComment';
import Comment from '../../components/Comment/Comment';
import Confirm from '../../components/Confiirm/Confirm';


const Post = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const {api, user, setPosts, posts} = useContext(context);
    const usr = JSON.parse(user);
    const [post, setPost] = useState({});
    const [authorInfo, setAuthorInfo] = useState({});
    const [updData, setUpdData] = useState('');
    const [cntComments, setCntComments] = useState([]);
    const [like, setLike] = useState(false);
    const [visible, setVisible] = useState(true);

    const [active, setActive] = useState(false);

    useEffect(() => {
        api.getPostById(id)
            .then(data => {
                // console.log(data);
                setPost(data);
                setAuthorInfo(data.author);
                setUpdData(data.updated_at);
                setCntComments(data.comments.length);

                if(data.likes.length && data.likes.includes(usr._id)) {
                    setLike(true);
                }
            })
    }, [posts]);

    const addLike = (e) => {
        e.stopPropagation();
        e.preventDefault();

        if(like) {
            api.deleteLike(id)
                .then(data => {
                    setLike(false);
                    setPosts(prev => dataFilter(prev, data));
                })
        } else {
            api.addLike(id)
                .then(data => {
                    setLike(true);
                    setPosts(prev => dataFilter(prev, data));
                })
        }
    };

    const confirmDelete = () => {
        setActive(true);
    }

    const deletePost = () => {
        api.deletePost(id)
            .then(data => {
                setPosts(prev => prev.filter(el => el._id !== data._id));
                navigate(path + "home");
            })
    };

    const closeForm = () => {
        setActive(false);
        navigate(path + `posts/${id}`);
    }

    return (
        <div className={style.post}>
            <ButtonBack btnText={'На главную'} toPath={path + "home"}/>
        
            <div className={style.content}>
                { post && post.author && post.author._id === usr._id && 
                    <div className={style.btn_block}>
                        <Link to={path + `modify/${id}`} ><PencilIcon /></Link>
                        <TrashIcon className={style.icon} onClick={confirmDelete} />
                    </div>
                }
                    <h2 className={style.heading}>{post.title}</h2>
                    <div className={style.favorite} onClick={addLike}>
                        { !like 
                            ? <i className="fa-regular fa-heart" /> 
                            : <i className="fa-solid fa-heart" />
                        }
                    </div>

                    <div className={style.author_and_data}>
                        <div className={style.item}>
                            <span>Опубликовано: </span>
                            <span>{updData.substr(0, 10)}</span>
                        </div>
                        <div className={style.item}>
                            <span>Автор: </span>
                            <span>{authorInfo.name}</span>
                        </div>
                    </div>

                    <div className={style.cnt_comments}>
                        <div className={style.item}>
                            <HashLink className={style.link} to={path + `posts/${id}/#comments`}>
                                <span>Комментарии: </span>
                                <span>{cntComments}</span>
                            </HashLink>
                        </div>
                    </div>
                    
                    <div className={style.content}>
                        <div className={style.img}>
                            <img src={post.image} alt="Изображение к посту" />
                        </div>

                        <div>{post.text}</div>
                    </div>

            </div>

            <div className={style.comments_block}>
                <h3 id='comments' onClick={() => setVisible(!visible)}>Комментарии к посту</h3>
                <AddComment id={id} setPost={setPost} setCntComments={setCntComments} />
                
                <div className={visible ? style.visible : style.not_visible}>
                    {post.comments && post.comments.length > 0
                        && post.comments.map((comment) => <Comment {...comment} key={comment._id} setPost={setPost} setCntComments={setCntComments} />)
                    }
                </div>
            </div>

            { active && <Confirm deleteHandler={deletePost} closeForm={closeForm} /> }

        </div>
    )
}

export default Post;