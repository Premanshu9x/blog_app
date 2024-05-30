import React, { useState } from 'react';
import axios from 'axios';
import { url } from '../App';

function PostForm() {
    const [formData, setFormData] = useState({
        username: '',
        title: '',
        description: '',
        image: null
    });

    const handleChange = e => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('username', formData.username);
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('image', formData.image);

            await axios.post(`${url}/api/posts`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert('Post uploaded successfully!');
            // Clear form data after successful upload
            setFormData({
                title: '',
                description: '',
                image: null
            });
        } catch (error) {
            console.error('Error uploading post:', error);
            alert('Error uploading post. Please try again.');
        }
    };

    return (
        <div>
            <h2>Create a New Post</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </div>
                <div>
                    <label>Image:</label>
                    <input type="file" name="image" accept="image/*" onChange={handleChange} required />
                </div>
                <button type="submit">Upload Post</button>
            </form>
        </div>
    );
}

export default PostForm;
