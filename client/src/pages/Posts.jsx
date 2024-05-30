import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../App';

function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get(`${url}/api/posts`) // Assuming your Express server runs on the same host as your React app
            .then(response => {
                setPosts(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }, []); // Empty dependency array means this effect runs only once when the component mounts

    return (
        <div>
            <h1>Posts</h1>
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        <p>By: {post.username}</p>
                        <img src={`${url}/uploads/${post.image}`} alt={post.title} style={{ maxWidth: '30%' }} crossorigin="anonymous"/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostList;
