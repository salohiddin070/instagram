import React, { useEffect, useState, useRef } from 'react'
import { PostService } from '../../services/PostService'
import { useParams } from 'react-router-dom'
import { Reactions } from '../../services/Reactions';
import { Button, Skeleton, message } from 'antd';
import { useInfoContext } from '../../context/InfoContext';
import "./OnePostInfo.scss";
import { DeleteOutlined, EditOutlined, SendOutlined } from '@ant-design/icons';
import { CommentService } from '../../services/CommentService';

const OnePostInfo = () => {
    const comment_rf = useRef();
    const editCom_rf = useRef();
    const { user } = useInfoContext();
    const { id } = useParams();
    const [currentPost, setCurrentPost] = useState(null);
    const [isPostChange, setIsPostChange] = useState(false);
    const [comLoading, setComLoading] = useState(false);
    const [editingComId, setEditingComId] = useState(null);

    const handleOnePost = async () => {
        try {
            let data = await PostService.getOnePostById(id);
            setCurrentPost({ ...data[0], comments: data[0].comments.reverse() });
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        handleOnePost();
    }, [isPostChange])

    const handleLike = async () => {
        try {
            const data = await Reactions.like(id);
            setIsPostChange(!isPostChange);
            message.success(data.message);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDislike = async () => {
        try {
            const data = await Reactions.dislike(id);
            message.success(data.message);
            setIsPostChange(!isPostChange);
        } catch (error) {
            console.log(error);
        }
    }

    const handleCheckComment = (comments) => {
        if (comments.length === 0) return "Nothing commented yet!";
        else return `view all ${comments.length} comments`;
    }

    const handleAddComment = async () => {
        setComLoading(true);
        try {
            const obj = {
                postId: id,
                content: comment_rf.current.value
            }
            await CommentService.addComment(obj);
            comment_rf.current.value = "";
            setIsPostChange(!isPostChange);
        } catch (error) {
            message.error(error.response.data.message);
        }
        setComLoading(false);
    }

    const handleDeleteComment = async (comId) => {
        try {
            await CommentService.deleteComment(comId);
            setIsPostChange(!isPostChange);
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async () => {
        try {
            await CommentService.updateComment(editingComId, { content: editCom_rf.current.value });
            editCom_rf.current.value = "";
            setEditingComId(null);
            setIsPostChange(!isPostChange);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        currentPost ? <div className='view-post'>
            <img src={currentPost.image.url} alt='post image' />
            <div className="post-box">
                <div className="post-actions">
                    <div>
                        {
                            currentPost.like.find((item) => item === user._id) ?
                                <box-icon color='red' onClick={handleDislike} type='solid' name='heart'></box-icon>
                                :
                                <box-icon type='regular' onClick={handleLike} name='heart' ></box-icon>
                        }
                        <box-icon name='comment' ></box-icon>
                        <box-icon name='share' ></box-icon>
                    </div>
                    <box-icon name='bookmark' ></box-icon>
                </div>
                <span>{currentPost.like.length} likes</span>
                <p>{currentPost.content}</p>
                <div className="comment-service">
                    <input type="text" ref={comment_rf} placeholder='Add a comment...' />
                    <Button loading={comLoading} onClick={handleAddComment} icon={<SendOutlined />}></Button>
                </div>
                <small>{handleCheckComment(currentPost.comments)}</small>
                <ul>
                    {
                        // console.log(currentPost.comments)
                        currentPost.comments.map((item, index) => {
                            return <li>
                                <div>
                                    <div>
                                        <box-icon name='user'></box-icon>
                                        <strong>{item.author[0].name} {item.author[0].surname}</strong>
                                    </div>
                                    {item.authorId === user._id && <div>
                                        {
                                            item._id === editingComId ? <>
                                                <Button onClick={handleUpdate} size='small'>save</Button>
                                                <Button onClick={() => handleDeleteComment(item._id)} size='small' icon={<DeleteOutlined />}></Button>
                                            </> : <>
                                                <Button onClick={() => setEditingComId(item._id)} size='small' icon={<EditOutlined />}></Button>
                                                <Button onClick={() => handleDeleteComment(item._id)} size='small' icon={<DeleteOutlined />}></Button>
                                            </>
                                        }
                                    </div>}
                                </div>
                                {item._id === editingComId ? <input defaultValue={item.content} ref={editCom_rf} placeholder='enter a comment' type='text' /> : <p>{item.content}</p>}
                            </li>
                        })
                    }
                </ul>
            </div>
        </div> : <Skeleton active />
    )
}

export default OnePostInfo