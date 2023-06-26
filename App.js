/* eslint-disable no-template-curly-in-string */
import { useEffect, useState } from 'react';
import './App.css';
import { getDatabase,push,ref,set,onChildAdded } from "firebase/database";

function App() {
  const [name, setName] = useState('');
  const [chats, setChats] = useState([]);
  const [msg, setMsg] = useState('');
  const [tellme, setTellme] = useState(false);

  const db = getDatabase();
  const chatListRef = ref(db, 'chats');

  const updateHeight = () => {
    const el = document.getElementById('chat');
    if (el) el.scrollTop = el.scrollHeight;
  };

  useEffect(() => {
    if (name) {
      onChildAdded(chatListRef, (data) => {
        setChats((chats) => [...chats, data.val()]);
        setTimeout(() => {
          updateHeight();
        }, 100);
      });
    } else {
      setChats([]);
    }
  }, [name]);


  useEffect(() => {
    if (tellme) {
      const chatRef = push(chatListRef);
      set(chatRef, {
        name,
        message: msg,
      });
      setMsg('');
      setTellme(false);
    }
  }, [tellme, msg, chatListRef, name]);

  const sendChat = () => {
    setTellme(true);
  };

  return (
    <div>
      {name ? null : (
        <div className="small-box">
          <label id="heading" style={{padding:'5px'}}>Enter your name</label>
          <input
            type="text"
            placeholder="Enter name to start"
            id="inpt"
            onBlur={(e) => setName(e.target.value)}
          ></input>
        </div>
      )}

      {name ? (
        <div>
          <h3>User: {name}</h3>

          <div className="chat-container" id="chat">
            {chats.map((c, i) => (
              <div key={i} className={`Container ${c.name === name ? 'me' : ''}`}>
                <p className="chatbox">
                  <strong>{c.name} </strong>
                  <span>{c.message}</span>
                </p>
              </div>
            ))}

            <div className="btm">
              <input
                placeholder="Type Your Message"
                onInput={(e) => setMsg(e.target.value)}
                value={msg} style={{width:'63vh',padding:'10px',fontSize:'2.6vh'}}
              ></input>
              <button  onClick={(e) => sendChat()}>Send</button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default App;


