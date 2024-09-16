import React, { useState } from 'react'

import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

function Loginpage() {

    const navigate = useNavigate()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user,loading] = useAuthState(auth)
 
  //signin
  const onSignin = (e) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate("/dashboard")
      })
      .catch((error) => {
        alert(error)
      });
  };


  return (
    <div
    style={{
      position:'fixed',
      width:'100vw',
      height:'100vh',
      backgroundColor:'#c4bebf',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'column',
    }}
    >
                <input
                style={{
                  margin:'1vw',
                  color:'white',
                  width:'18vw',
                  padding:'.5vw',
                  border:'none',
                  backgroundColor:'#4a4849',
                  border:'1px solid white',
                  borderRadius:'40vw',
                  fontSize:'1vw',
                  fontWeight:'bold'
                }}
                  value={email}
                  placeholder='email'
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                />
                <input
                style={{
                  margin:'1vw',
                  color:'white',
                  width:'18vw',
                  padding:'.5vw',
                  border:'none',
                  backgroundColor:'#4a4849',
                  border:'1px solid white',
                  borderRadius:'40vw',
                  fontSize:'1vw',
                  fontWeight:'bold'
                }}
                  value={password}
                  placeholder='password'
                  onChange={(e) => setPassword(e.target.value)}
                  type="text"
                />
                <button
                style={{
                  margin:'1vw',
                  color:'white',
                  width:'18vw',
                  padding:'.5vw',
                  border:'none',
                  backgroundColor:'#4a4849',
                  border:'1px solid white',
                  borderRadius:'40vw',
                  fontSize:'1vw',
                  fontWeight:'bold'
                }} onClick={onSignin}>
                Login
                </button>
<div
style={{
  position:'absolute',
  top:'10px',
  right:'10px'
}}
>
             
                </div>
               
    </div>
  )
}

export default Loginpage
