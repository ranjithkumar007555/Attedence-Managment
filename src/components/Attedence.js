import React, { useEffect, useState } from 'react'

import { auth, db } from '../firebase';
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs, where, doc, updateDoc, setDoc, increment } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
function Attedence() {

    const [getdata,setgetdata] = useState([])
    const [teacherdata,setteacherdata] = useState([])
    const [user,loader] = useAuthState(auth)
    const [attedencename,setattedencename] = useState([])

    const navigate = useNavigate()

    useEffect(()=>{
      getsutdentdata()
      getteacherdata()
    },[user])

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

    const attedencesubmit = async() =>{
      for(var i=0; i < attedencename.length; i++){
      const updateref = doc(db,"student",attedencename[i])
        try {
            await updateDoc(updateref,{
                attedence : increment(1)
            })
          
        } 
      catch (error) {
            console.log(error)
        }
        }
        navigate("/dashboard")
      }

  return (
    <div>
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
            width:'30vw',
            justifyContent:'space-between'
          }}
          >

          <h2>Name</h2>

          <h2>Attedence</h2>

          </div>
          {getdata?.map((e) => {return(
                      <div
                      style={{
                        display:'flex',
                        flex:'row',
                        width:'30vw',
                        justifyContent:'space-between',  
                        alignItems:'center'
                      }}>
                        <h3>{e.name}</h3>
                        <input 
                        type='checkbox'
                        name='attedence'
                        value={e?.id}
                        onChange={(e)=>setattedencename([...attedencename,(e.target.value)])}
                        />
                      </div>
                    )})}
                    <button
              style={{
                cursor:'pointer'

              }}
                    onClick={attedencesubmit}
                    >
                        Submit
                    </button>
                    <div 
              style={{
                padding:"1vw",
                cursor:'pointer'

              }}
              onClick={()=>navigate("/dashboard")}>Back</div>
</div>
    </div>
  )
}

export default Attedence
