import React, { useEffect, useState } from 'react'

import { auth, db } from '../firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { query, collection, getDocs, where } from "firebase/firestore";

function Dashboard() {

    const navigate = useNavigate()
    const [user,loader] = useAuthState(auth)

    const [name,setname] = useState("")
    const [getdata,setgetdata] = useState([])
    const [teacherdata,setteacherdata] = useState([])
    const [getsingle,setsingle] = useState([])



    useEffect(()=>{
      getsutdentdata()
      getteacherdata()
      getsingledata()
    },[user])

    async function getsutdentdata() {
      if (user?.uid != undefined) {
        const q = query(collection(db, "student"), where("uid", "==", user?.uid));
        await getDocs(q).then((querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setgetdata(newData);
          console.log(newData);
        });
      }
    }

    async function getsingledata() {
      if (user?.uid != undefined) {
        const q = query(collection(db, "student"), where("suid", "==", user?.uid));
        await getDocs(q).then((querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setsingle(newData);
          console.log(newData);
        });
      }
    }

    async function getteacherdata() {
      if (user?.uid != undefined) {
        const q = query(collection(db, "teacher"), where("uid", "==", user?.uid));
        await getDocs(q).then((querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setteacherdata(newData);
          console.log(newData);
        });
      }
    }

  //logout
  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
    <div
    style={{
      display:'flex',
      flexDirection:'row',
      width:'100vw',
      height:'100vh',
      position:'fixed'
    }}
    >
      {getsingle == null &&
      <div
      style={{
        display:'flex',
        flexDirection:'column',
        height:'100vh',
        width:'25vw',
        alignItems:'center',
        backgroundColor:'gray'
      }}
      >
        <h1
        style={{
          color:'#014515',
          padding:'1vw',
        }}
        >Dashboard</h1>
        <button
        style={{
          fontSize:'1.5vw',
          borderRadius:'30vw',
          cursor:'pointer',
          backgroundColor:'#c7c9c8',
          color:'#010e6e',
          margin:'1vw',padding:'.6vw'
        }}
                      onClick={() => navigate('/addstudent')}
                      >Add Student</button>
                      <button
        style={{
          fontSize:'1.5vw',
          borderRadius:'30vw',
          cursor:'pointer',
          backgroundColor:'#c7c9c8',
          color:'#010e6e',
          margin:'1vw',padding:'.6vw'
        }}
          
                      onClick={() => navigate('/attedence')}
                      >Attedence</button>
                     
      </div>
}
      <button
        style={{
          position:'absolute',
          fontSize:'1.5vw',
          borderRadius:'30vw',
          cursor:'pointer',
          backgroundColor:'#c7c9c8',
          color:'RED',padding:'.6vw',
          bottom:'20px',
          left:'50px'
        }}
                      onClick={logout}
                      >Logout</button>
        <div
        style={
          {
            display:'flex',
            flexDirection:'column'
          }
        }
        >
          <div>
          {teacherdata?.map((e) => {return(
                      <div
                      style={{
                        display:'flex',
                        flexDirection:'row',
                        alignItems:'center',
                        padding:'.5vw'
                      }}>
                        <h1
                        style={{
                          display:'flex',
                          padding:'1vw'
                        }}
                        >{e.teachername}</h1>
                        <h2
                        style={{
                          display:'flex',
                          padding:'1.3vw',
                          marginTop:'1.5vw'
                        }}>{e.class}</h2>
                      </div>
                    )})}
          </div>

          <div
          style={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            justifyContent:'center',
            width:'70vw',
            overflow:'scroll',
            overflowX: "hidden",
            scrollbarWidth: "none"
          }}
          >

          <div
          style={{
            display:'flex',
            flex:'row',
            width:'50vw',
            justifyContent:'space-between'
          }}
          >

          <h2>Name</h2>

          <h2>Age</h2>

          <h2>Attedence</h2>

          </div>


          <div>
          {getdata?.map((e) => {return(
                      <div
                      style={{
                        display:'flex',
                        flex:'row',
                        width:'50vw',
                        justifyContent:'space-between',  
                        alignItems:'center'
                      }}>
                        <h3>{e.name}</h3>
                        <h3>{e.age}</h3>
                        <h3>{e.attedence}</h3>
                      </div>
                    )})}
          </div>
          <div>
          {getsingle?.map((e) => {return(
                      <div
                      style={{
                        display:'flex',
                        flex:'row',
                        width:'50vw',
                        justifyContent:'space-between',  
                        alignItems:'center'
                      }}>
                        <h3>{e.name}</h3>
                        <h3>{e.age}</h3>
                        <h3>{e.attedence}</h3>
                      </div>
                    )})}
          </div>

          </div>




        </div>


    
    <div>
      
    </div>
    
                    
    </div>
  )
}

export default Dashboard
