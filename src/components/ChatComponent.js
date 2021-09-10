import React from 'react';
import Messages from './MessagesComponent';
import MessageInput from './MessageInputComponent';

export const Chat = ({ socket, user }) => {

    return (
        <div className="col-8">
            Chat Here
            { socket ? (
                <div>
                    <Messages user={user} socket={socket} />
                    <MessageInput user={user} socket={socket} />
                </div>
            ) : (
                <div>Not Connected</div>
            )}
        </div>
    );


};

export default Chat;