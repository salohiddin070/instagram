import React, { useEffect, useState } from 'react'
import { Skeleton, Modal } from 'antd';
import "./Profile.scss";
import moment from 'moment';
import { PostService } from '../../services/PostService';
import PostCard from '../../components/PostCard/PostCard';
import { useInfoContext } from '../../context/InfoContext';

const Profile = () => {
    const { isPostChange, setIsPostChange } = useInfoContext();
    const [user, setUser] = useState(null);
    const [userPosts, setUserPosts] = useState(null);
    const [updatedPost, setUpdatePost] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [newImg, setNewImg] = useState("");

    const [open, setOpen] = useState(false);

    const handleUserPosts = async () => {
        try {
            const data = await PostService.getCurrentUserPosts();
            setUserPosts(data);
        } catch (error) {
            console.log(error);
        }
    }

    const handleUpdate = async () => {
        try {
            const formdata = new FormData();
            formdata.append('title', updatedPost.title);
            formdata.append('content', updatedPost.content);
            if (newImg !== '') formdata.append('image', newImg);

            const data = await PostService.updatePost(editingId, formdata);
            setIsPostChange(!isPostChange)
            setOpen(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleFillObj = (event) => {
        setUpdatePost(prev => {
            return {
                ...prev,
                [event.target.id]: event.target.value
            }
        })
    }

    useEffect(() => {
        setUpdatePost(userPosts?.find(item => item._id === editingId));
    }, [editingId])

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem("user")))
        handleUserPosts();
    }, [isPostChange])
    return (
        user ? <div className='user'>
            <div className="card-body shadow rounded mt-5">
                <div className="row">
                    <div className="col-4">
                        <img src="https://as2.ftcdn.net/v2/jpg/04/10/43/77/1000_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg" alt="avatar" className="img-fluid rounded" />
                    </div>
                    <div className="col-8 py-3">
                        <h3 className='mb-0'>{user.name} {user.surname}</h3>
                        <span className="text-muted">{user.email}</span>
                        <p>{moment(user.createdAt).format("MMMM Do YYYY")} y.</p>
                    </div>
                </div>
            </div>
            <Modal okText="Saqlash" cancelText="Bekor qilish" open={open} onCancel={() => setOpen(false)} onOk={handleUpdate}>
                <label htmlFor="updImg">
                    <img src={typeof newImg === 'object' ? URL.createObjectURL(newImg) : updatedPost?.image.url} alt="post photo" />
                </label>
                <input onChange={(e) => setNewImg(e.target.files[0])} id='updImg' style={{ display: "none" }} type="file" />
                <div>
                    <label htmlFor="title">Title</label>
                    <input value={updatedPost?.title} id='title' onChange={(e) => handleFillObj(e)} type="text" placeholder='enter title' />
                </div>
                <div>
                    <label htmlFor="content">Text</label>
                    <input value={updatedPost?.content} id='content' onChange={(e) => handleFillObj(e)} type="text" placeholder='write some info' />
                </div>
            </Modal>
            <div className="user-posts">
                <div className="row">
                    {
                        userPosts ? userPosts.length === 0 ? <h3>Postlar mavjud emas!</h3> : userPosts.map(post => {
                            return <div className='col-6' key={post._id}>
                                <PostCard setEditingId={setEditingId} setOpen={setOpen} post={post} page="profile" />
                            </div>
                        }) : <div className="row pt-5">
                            <div className='col-6'>
                                <Skeleton active />
                            </div>
                            <div className='col-6'>
                                <Skeleton active />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div> : <Skeleton active />
    )
}

export default Profile