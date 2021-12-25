import React, { useState, useEffect } from 'react';
import './App.css';
import Posts from '../components/Post';
import { db, auth } from '../firebase';
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Form from '../components/Form';

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    })
  }, [user]);

  return (
    <div className="App">
      <div className="container" style={{ backgroundColor: 'white', borderBottom: '1px solid lightgray' }}>
        <div className="App-header">
          <img className="App-logo"
          src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt=""
          />
        </div>

        <SignIn user={user} />
        <SignUp user={user} />
      </div>

      {
        user?.displayName ? (
          <Form username={user.displayName} />
        ) : (
          <h3
            style={{ opacity: '60%', textAlign: 'center' }}
          >
            <strong>
              Sorry, you need to login to upload(if this is first time, logout and signin again).
            </strong>
          </h3>
        )
      }

      {
        user ? (
          posts.map(({id, post}) => (
          <Posts key={id} postId={id} user={user} username={post.username} imageUrl={post.imageUrl} caption={post.caption} />
        ))
        ) : (
          <h3 
            style={{ opacity: '60%', textAlign: 'center' }}
          >
            <strong>
              Sorry, please login first or create an account in case you don't have.
            </strong>
          </h3>
        )
      }

    </div>
  );
}

export default App;
