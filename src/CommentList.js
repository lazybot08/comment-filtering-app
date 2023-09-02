import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentDisplay from './CommentDisplay';


function CommentList() {
    const [filter, setFilter] = useState('');
    const [selectedPost, setSelectedPost] = useState(null);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/comments')
            .then((response) => {
                setComments(response.data);
            })
            .catch((error) => {
                console.error('Error fetching comments:', error);
            });
    }, []);

    const posts = {};

    comments.forEach((comment) => {
        if (!posts[comment.postId]) {
            posts[comment.postId] = comment;
        }
    });


    return (
        <div>
          <input
            type="text"
            placeholder="Filter by postId"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <ul>
            {Object.values(posts)
              .filter((post) =>
                post.postId.toString().includes(filter)
              )
              .map((post) => (
                <li key={post.id}>{post.name}</li>
              ))}
          </ul>
          <CommentDisplay comments={selectedPost ? selectedPost.comments : []} />
        </div>
    );
}

export default CommentList;
