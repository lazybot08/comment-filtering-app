import React from 'react';

function CommentDisplay({ comments }) {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <h3>{comment.name}</h3>
          <p>{comment.body}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentDisplay;
