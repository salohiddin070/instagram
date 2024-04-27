import React, { useRef, useState } from 'react'
import "./CreatePost.scss";
import { Button, message } from 'antd';
import { PostService } from '../../services/PostService';

const CreatePost = () => {
    const [image, setImage] = useState(null);
    const title = useRef();
    const content = useRef();

    const handleCreatePost = async () => {
        try {
            let formData = new FormData();
            formData.append("title", title.current.value)
            formData.append("content", content.current.value)
            formData.append('image', image)
            const data = await PostService.createPost(formData);
            message.success(data.message);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='create'>
            <input onChange={(e) => setImage(e.target.files[0])} id='post' type="file" accept='image/*' />
            <label htmlFor="post">
                {
                    image ?
                        <img src={URL.createObjectURL(image)} alt="" /> : <box-icon name='plus'></box-icon>
                }
            </label>
            <input ref={title} type="text" className="title" placeholder='title' />
            <textarea ref={content} cols="30" placeholder='write something...' rows="3"></textarea>
            <Button onClick={handleCreatePost}>Create Post</Button>
        </div>
    )
}

export default CreatePost