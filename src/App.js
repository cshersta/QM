import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import Chat from './components/ChatComponent';
import ChatGroups from './components/ChatGroupsComponent';
import Login from './components/LoginComponent';

import './App.css';


function App() {
    const [socket, setSocket] = useState(null);
    const [user, setUser] = useState(null);
    const [chatGroup, setChatGroup] = useState(null);

  useEffect(() => {
      const newSocket = io(`http://${window.location.hostname}:3000`, { user: user });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
          <Header logout={() => setUser(null)} user={user}  />
          <div className="container">
              {user ? (
                      <div className="row">
                      <ChatGroups user={user} socket={socket} chatGroupReturn={chatGroup => setChatGroup(chatGroup)}  />
                      <Chat user={user} socket={socket} chatGroup={chatGroup} />
                      </div>
                ) : (
                      <Login loginForm={username => setUser(username)} chatGroupReturn={chatGroup => setChatGroup(chatGroup)} signUpForm={username => setUser(username)} socket={socket}  />
            )}
            </div>
           <Footer />
    </div>
  );
}

export default App;