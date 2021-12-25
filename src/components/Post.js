import React, { useState, useEffect } from 'react';
import Avatar from "@material-ui/core/Avatar";
import './Post.css';
import firebase from 'firebase/compat/app';
import { db } from '../firebase';

function Posts({ postId, user, username, imageUrl, caption }) {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useEffect(() => {
    if (postId) {
      db.collection('posts')
      .doc(postId)
      .collection('comments')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()))
      })
    }    
  }, [postId])

  const postComment = (e) => {
    e.preventDefault();

    db.collection('posts').doc(postId).collection('comments').add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      text: comment,
      username: user.displayName
    })
    setComment('')
  }

  return (
    <div className="container">
      <div className="Post">
        <div className="Post-header">
          <Avatar
            className="Post-avatar"
            src="https://www.logolynx.com/images/logolynx/18/18a0cba3b22a6a713ce8966918165692.jpeg"
            alt=""
          />
          <h3>{ username }</h3>
        </div>
        <img 
          className="Post-image"
          src={ imageUrl }
          alt=""
        />
        <h4 className="Post-text"><strong>{ username }</strong> { caption }</h4>

        <div className="Post-comments">
          {
            comments.map((comment) => (
              <p>
                <strong>{ comment.username }</strong> { comment.text }
              </p>
            ))
          }
        </div>

        <form className='Post-form'>
          <input className='Post-input' type="text" placeholder='Add a comment...' 
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            className='Post-button'
            disabled={!comment}
            type='submit'
            onClick={postComment}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  )
}

export default Posts;
