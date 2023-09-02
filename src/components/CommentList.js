import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentDisplay from './CommentDisplay';
import './CommentList.css';

function CommentList() {
  const [filteredComments, setFilteredComments] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [postIdFilter, setPostIdFilter] = useState('');
  const [availablePostIds, setAvailablePostIds] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/comments')
      .then((response) => {
        const commentsData = response.data;
        setComments(commentsData);
        initializeAvailablePostIds(commentsData);
        setFilteredComments(getFirstComments(commentsData));
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }, []);

  const initializeAvailablePostIds = (commentsData) => {
    const uniquePostIds = [...new Set(commentsData.map((comment) => comment.postId))];
    setAvailablePostIds(uniquePostIds);
  };

  const getFirstComments = (commentsData) => {
    const firstComments = [];
    const postIdsProcessed = new Set();
    for (const comment of commentsData) {
      if (!postIdsProcessed.has(comment.postId)) {
        firstComments.push(comment);
        postIdsProcessed.add(comment.postId);
      }
    }
    return firstComments;
  };

  useEffect(() => {
    const filtered = getFirstComments(comments).filter((comment) =>
      comment.postId.toString().includes(postIdFilter)
    );
    setFilteredComments(filtered);
  }, [postIdFilter, comments]);

  // Function to display all comments related to the selected postId
  const displayAllComments = (postId) => {
    if (!postId) {
      return [];
    }
  
    const filtered = comments.filter((comment) => comment.postId === postId);
    console.log('Filtered Comments:', filtered);
  
    return filtered;
  };
  

  return (
    <div className="container">
      <div className="left-container">
        <h1>Comment List</h1>
        <div className="filter-input">
          <input
            type="text"
            placeholder="Filter by Post Id"
            value={postIdFilter}
            onChange={(e) => setPostIdFilter(e.target.value)}
          />
        </div>
        <div className="posts">
          <ul>
            {filteredComments.map((comment) => (
              <li
                key={comment.id}
                onClick={() => setSelectedPost(comment.postId)}
                className={selectedPost === comment.postId ? 'selected' : ''}
              >
                <strong>Post #{comment.postId}</strong> - {comment.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="right-container">
        <CommentDisplay comments={displayAllComments(selectedPost)} />
      </div>
    </div>
  );
}

export default CommentList;
