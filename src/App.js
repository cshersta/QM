import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Header from './components/HeaderComponent';
import Footer from './components/FooterComponent';
import Chat from './components/ChatComponent';
import ChatGroups from './components/ChatGroupsComponent';

import './App.css';


function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  return (
    <div className="App">
          <Header />
          <div className="container">
              <div className="row">
                  
         <ChatGroups />
                  <Chat socket={socket} />
             </div>
        </div>
      <Footer />
    </div>
  );
}

export default App;