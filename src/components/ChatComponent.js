import React from 'react';
import Messages from './MessagesComponent';
import MessageInput from './MessageInputComponent';
var _ = require('lodash');

export const Chat = ({ socket, user, chatGroup }) => {

    return (
        <div key={chatGroup[0]._id} className="col-8">
            Chat with {chatGroup[0].users.length > 1 ? _.without(chatGroup[0].users, user) : user}
            { socket ? (
                <div>
                    <Messages user={user} socket={socket} chatGroup={chatGroup} />
                    <MessageInput user={user} socket={socket} chatGroup={chatGroup} />
                </div>
            ) : (
                <div>Not Connected</div>
            )}
        </div>
    );


};

export default Chat;