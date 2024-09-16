import { addDoc, collection, doc, setDoc , query, getDocs, where} from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
function Addstudent() {

    const navigate = useNavigate()
    const location = useLocation();
    const [user,loader] = useAuthState(auth)

    const [name,setname] = useState("")
    const [age,setage] = useState("")
    const [email,setemail] = useState("")
    const [getdata,setgetdata] = useState([])
    useEffect(()=>{
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
            setgetdata(newData);
            console.log(newData);
          });
        }
      }

    const addstudentdata = async() =>{
        // Add a new document in collection "cities"
        const docRef = await addDoc(collection(db, "student"), {
          name: name,
          age:age,
          email:email,
          attedence:0,
          uid:user?.uid
        });
        navigate("/dashboard")
        }


  return (
    <div>
      <div>
          {getdata?.map((e) => {return(
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
          }}
          >
            <div
            style={{
              display:'flex',
              padding:'1vw'
            }}
            >
      Name   <input
      style={{
        display:'flex',
        padding:'.2vw',
        marginLeft:'2vw'
      }}
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  type="text"
                />
                </div>
                <div
            style={{
              display:'flex',
              padding:'1vw'
            }}
            >
      Age   <input
      style={{
        display:'flex',
        padding:'.2vw',
        marginLeft:'2vw'
      }}
                  value={age}
                  onChange={(e) => setage(e.target.value)}
                  type="text"
                />
                </div>
                <div
            style={{
              display:'flex',
              padding:'1vw'
            }}
            >
      Email   <input
      style={{
        display:'flex',
        padding:'.2vw',
        marginLeft:'2vw'
      }}
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="text"
                />
                </div>
              <button
              style={{
                cursor:'pointer'

              }} onClick={addstudentdata}>Addstudent</button>
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

export default Addstudent
