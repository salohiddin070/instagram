import React, { useState } from 'react'
import "./PostCard.scss";
import { Popover, Button, message } from 'antd';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { PostService } from '../../services/PostService';
import { Reactions } from '../../services/Reactions';
import { useInfoContext } from '../../context/InfoContext';

const PostCard = ({ post, page, setOpen, setEditingId }) => {
    const { user, isPostChange, setIsPostChange } = useInfoContext();
    const [loading, setLoading] = useState(false);
    const { _id, comments, like, title, content, dislike, image, views, author } = post;

    const handleDeletePost = async () => {
        setLoading(true);
        try {
            await PostService.deletePost(_id);
            setIsPostChange(!isPostChange);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }
    const handleLike = async () => {
        try {
            const data = await Reactions.like(_id);
            message.success(data.message);
            setIsPostChange(!isPostChange);
        } catch (error) {
            console.log(error);
        }
    }
    const handleDislike = async () => {
        try {
            const data = await Reactions.dislike(_id);
            message.success(data.message);
            setIsPostChange(!isPostChange);
        } catch (error) {
            console.log(error);
        }
    }

    const getIdAndOpenModal = () => {
        setOpen(true)
        setEditingId(_id)
    }

    return (
        <div className="post-card">
            <div className="post-author">
                <div className="post-author-info">
                    <img src="https://image.pngaaa.com/345/1582345-middle.png" alt="author" />
                    <div>
                        <h4>{author[0].name}</h4>
                    </div>
                </div>
                {
                    page === "profile" ?
                        <Popover content={<div className='d-flex gap-3'>
                            <Button onClick={getIdAndOpenModal} icon={<EditOutlined />}></Button>
                            <Button loading={loading} onClick={handleDeletePost} icon={<DeleteOutlined />}></Button>
                        </div>} title="" trigger="click">
                            <Button>
                                <box-icon name='dots-horizontal-rounded'></box-icon>
                            </Button>
                        </Popover> : ""
                }
            </div>
            <div className="post-content">
                <Link to={`post/${_id}`}>
                    <img src={image.url} alt="post content" />
                </Link>
            </div>
            <div className="post-box">
                <div className="post-actions">
                    <div>
                        {
                            like.find((item) => item === user._id) ?
                                <box-icon color='red' onClick={handleDislike} type='solid' name='heart'></box-icon>
                                :
                                <box-icon type="regular" onClick={handleLike} name='heart' ></box-icon>
                        }
                        <box-icon name='comment' ></box-icon>
                        <box-icon name='share' ></box-icon>
                    </div>
                    <box-icon name='bookmark' ></box-icon>
                </div>
                <span>{like.length} likes</span>
                <h3>{title}</h3>
                <p>{content}</p>
                <small>view all {comments.length} comments</small>
                <input type="text" placeholder='Add a comment...' />
            </div>
        </div>
    )
}

export default PostCard