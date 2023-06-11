/* eslint-disable no-template-curly-in-string */
import { useEffect, useState } from 'react';
import './App.css';
import { getDatabase,push,ref,set,onChildAdded } from "firebase/database";



function App() {
  const [name,setName]= useState('')
  const [chats,setChats]=useState([])
  const [msg,setMsg]= useState('')

const db = getDatabase();
const chatListRef = ref(db, 'chats')

const updateHeight=()=>{
  const el =document.getElementById('chat');
  if(el)
  el.scrollTop=el.scrollHeight;
}

useEffect(()=>{
   
  onChildAdded(chatListRef, (data) => {
    setChats(chats=>[...chats,data.val()])
    setTimeout(()=>{
    updateHeight();
    },100)
  });
},[])

const sendChat=()=>{

const chatRef = push(chatListRef);
set(chatRef, {
  name, message: msg
});

// const c=[...chats];
// c.push({name,message:msg});
// setChats(c);
   setMsg('');
}

  return (
  
    <div>
    {name? null:
     <div className='small-box'>
      <label id="heading">Enter your name and relax</label>
       <input type='text' placeholder='Enter name to start' id="inpt" onBlur={e=>setName(e.target.value)}></input>

     </div>
    }

   {
    name ? <div>
    <h3>User: {name}</h3>
    
    <div className="chat-container" id="chat">

      {chats.map((c,i)=> (
      <div key={i} className={`Container ${c.name===name ? 'me' : ''}`}>
      <p className='chatbox'>
        <strong>{c.name} </strong>
        <span>{ c.message }</span>
      </p>
      </div>
      ))}
      

      <div className='btm'>

        <input placeholder='Type Your Message' onInput={e=>setMsg(e.target.value)} value={msg}></input>
        <button onClick={e=>sendChat()}>Send</button>
      </div>

    </div>
   </div> : null}


    </div>
  );
}

export default App;
