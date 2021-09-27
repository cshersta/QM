import React from 'react';
import Messages from './MessagesComponent';
import MessageInput from './MessageInputComponent';
import { Button, Row, Col } from 'reactstrap';
var _ = require('lodash');

export const Chat = ({ socket, user, chatGroup, logout }) => {

    return (
        <div>
            <Row className="chat-header" >
                <Col xs="1" className="my-auto">
                    <Row>
                        <Col xs="6">
                            <span className="fa fa-user-circle fa-2x"></span>
                        </Col>
                        <Col xs={{ size: 5, offset: 1 }}>
                            <span>{chatGroup[0].users.length > 1 ? _.without(chatGroup[0].users, user) : user}</span>
                        </Col>
                    </Row>
                </Col>
                <Col xs={{ size: 2, offset: 9 }} className="my-auto" >
                    <Button outline onClick={() => logout()}><span className="fa fa-sign-out fa-lg"></span> Logout</Button>
                </Col>
            </Row>
            <Row className="chat"    >
                <Col  key={chatGroup[0]._id}>
                    <Messages user={user} socket={socket} chatGroup={chatGroup} />
                    <MessageInput user={user} socket={socket} chatGroup={chatGroup} />
                </Col>
            </Row>
        </div>
    );


};

export default Chat;