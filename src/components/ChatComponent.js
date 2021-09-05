import React from 'react';
import Messages from './MessagesComponent';
import MessageInput from './MessageInputComponent';

export const Chat = ({ socket }) => {

    return (
        <div className="col-8">
            Chat Here
            { socket ? (
                <div>
                    <Messages socket={socket} />
                    <MessageInput socket={socket} />
                </div>
            ) : (
                <div>Not Connected</div>
            )}
        </div>
    );


};

export default Chat;