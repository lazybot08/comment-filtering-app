// CommentDisplay.js
import React from 'react';
import './CommentDisplay.css';

function CommentDisplay({ comments }) {
  return (
    <div className="comment-display">
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <strong>{comment.email}</strong>
            <p>{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentDisplay;
