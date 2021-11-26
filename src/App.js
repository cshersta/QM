import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Chat from './components/ChatComponent';
import ChatGroups from './components/ChatGroupsComponent';
import Login from './components/LoginComponent';
import { Container, Row, Col } from 'reactstrap';

import './App.css';


function App() {
    const [socket, setSocket] = useState(null);
    const [user, setUser] = useState(null);
    const [chatGroup, setChatGroup] = useState(null);

  useEffect(() => {
      const newSocket = io(`https://${window.location.hostname}:3000`, { secure: true,  user: user });
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="app">
          
          
          {user ? (
              <Container>
                       <Row>
                      <Col xs="3" className="group-sidebar" >
                                <ChatGroups user={user} socket={socket} chatGroupReturn={chatGroup => setChatGroup(chatGroup)}  />
                            </Col>
                            <Col xs="9">
                                <Chat user={user} socket={socket} chatGroup={chatGroup} logout={() => setUser(null)} />
                            </Col>
                       </Row>
                </Container>
                ) : (
                      <Login loginForm={username => setUser(username)} chatGroupReturn={chatGroup => setChatGroup(chatGroup)} signUpForm={username => setUser(username)} socket={socket}  />
            )}
            
           
    </div>
  );
}

export default App;