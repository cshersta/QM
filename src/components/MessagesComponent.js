import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardTitle, CardText } from 'reactstrap';
/*import { Transition } from 'react-transition-group';*/
import '../Messages.css';

function Messages({ socket, user, chatGroup }) {
    const [messages, setMessages] = useState({});

    useEffect(() => {
        const messageListener = (message) => {
            setMessages((prevMessages) => {
                const newMessages = { ...prevMessages };
                newMessages[message.id] = message;
                return newMessages;
            });
        };

        const deleteMessageListener = (messageID) => {
            setMessages((prevMessages) => {
                const newMessages = { ...prevMessages };
                delete newMessages[messageID];
                return newMessages;
            });
        };

        socket.on('message', messageListener);
        socket.on('deleteMessage', deleteMessageListener);
        socket.emit('getMessages', user, chatGroup);

        return () => {
            socket.off('message', messageListener);
            socket.off('deleteMessage', deleteMessageListener);
        };
    }, [socket]);

    function calculateTimeDisplay(time) {
        var curDate = new Date();
        var date = new Date(time);

        if (curDate.getDate() === date.getDate() && curDate.getMonth() === date.getMonth() && curDate.getFullYear() === date.getFullYear()) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        }
        else {
            return date.toLocaleDateString('en-US');
        }
    }

    return (
        <div className="chat-box"  >
            {[...Object.values(messages)]
                .sort((a, b) => a.time - b.time)
                .map((message) => (
                    <Row key={message.id}
                        className={message.user === user ? 'justify-content-end pb-1 m-0' : 'pb-1 m-0'}
                        title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
                    >
                        <Col xs={message.text.length > 55 ? '7' : 'auto'}>
                            <Card body inverse className={message.user === user ? 'message user-message' : 'message other-message'}>
                                {chatGroup[0].users.length > 2 && message.user !== user ? (
                                    <CardTitle className="m-0 user">{message.user}</CardTitle>
                                ) : ("")}
                                <CardText className="m-0">{message.text}</CardText>
                                <span className="date">{calculateTimeDisplay(message.time)}</span>
                            </Card>
                        </Col>
                    </Row >
                ))
                }
        </div>
    );
}

export default Messages;