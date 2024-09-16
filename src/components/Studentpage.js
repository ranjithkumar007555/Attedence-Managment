import { collection, getDoc, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

function Studentpage() {

  
  const navigate = useNavigate()
  const [user,loader] = useAuthState(auth)
  
  const [getdata,setgetdata] = useState([])
  
  useEffect(()=>{
    getsutdentdata()
  },[user])

  async function getsutdentdata() {
    if (user?.uid != undefined) {
      const q = query(collection(db, "student"), where("suid", "==", user?.uid));
      await getDoc(q).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setgetdata(newData);
        console.log(newData);
      });
    }
  }

  return (
    <div>
      <h1>Class Teacher</h1>
      {getdata?.map((e)=>{
        return(
          <div>
            {e.name}
          </div>
        )
      })}
    </div>
  )
}

export default Studentpage
