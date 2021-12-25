import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Input } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { auth } from '../firebase';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid lightgray',
  boxShadow: 24,
  p: 4,
};

export default function SignIn({ user }) {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const signIn = (e) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpen(false);
    setEmail('');
    setPassword('');
  }

  return (
    <div>

      {
        user ? (
          console.log(user)
        ) : (
          <Button onClick={handleOpen} style={{ color: 'gray' }}>Sign In</Button>
        )
      }
      
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <div className="Modal-header" style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <img src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
          </div>
          <form style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Input 
              type="email" placeholder='E-mail' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: '10px', border: '0 white', borderBottom: '1px solid gray' }}
            />
            <Input 
              type="password" placeholder='Password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: '10px', border: '0 white', borderBottom: '1px solid gray' }}
            />
            <Button 
              type="submit"
              onClick={signIn}
              style={{ color: 'black', display: 'flex', justifyContent: 'center' }}>
                Sign In
            </Button>
          </form>
        </Box>
      </Modal>

    </div>
  );
}
