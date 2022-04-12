import React, { useEffect, useState } from 'react';
import {
    Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, Container, Row, Col
} from 'reactstrap';
import FadeIn from 'react-fade-in';
var _ = require('lodash');

export const ChatGroups = ({ user, socket, chatGroupReturn }) => {

    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [userReturn, setUserReturn] = useState('');
    const [groups, setGroups] = useState('');
    const [groupSelected, setGroupSelected] = useState('');

    useEffect(() => {
        const chatGroupListener = (group) => {
            console.log("chatGroupListener ");
            console.log(group);
            setGroupSelected(group[0]);
            chatGroupReturn(group);
            setGroups(group);
        };

        socket.on('groups', chatGroupListener);
        socket.emit('getGroupsByUser', user);

        return () => {
            socket.off('groups', chatGroupListener);
        };
    }, [socket]);

    const handleGroupClick = (group) => {
        console.log("handleGroupClick");
        console.log(group);
        setGroupSelected(group);
        chatGroupReturn([group]);
    }

    const handleUserClick = (userSelected) => {
        let userArray = [userSelected.username, user];
        socket.emit('getChatGroup', userArray, function (chatGroup) {
            console.log(chatGroup);
            setIsSearchModalOpen(!isSearchModalOpen)
            setUserReturn('');
            setGroupSelected(chatGroup[0]);
            chatGroupReturn(chatGroup);
        });
    }

    //returns time if today, date if not
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

    function handleChange(value) {
        console.log(value);
        socket.emit('getUsersContaining', value, function (usersReturn) {
            console.log(usersReturn);
            setUserReturn(usersReturn);
        });
    }


    return (
        <div className="group-sidebar">
            
            <FadeIn>
                {[...Object.values(groups)]
                    .map((group, index) => (
                        <Row key={group._id} className={group._id === groupSelected._id ? 'group-selected':'group'}   onClick={() => handleGroupClick(group)}>
                            <Col xs="1" className="p-2 my-auto">
                                <span className="fa fa-user-circle fa-2x"></span>
                            </Col>
                            <Col xs={{ size: 10, offset: 1 }}>
                                <Row>
                                    <Col xs={{ size: 8, offset: 0 }}>
                                        <span className="group-title">{group.users.length > 1 ? _.without(group.users, user) : user}</span>
                                    </Col>
                                    <Col xs={{ size: 4, offset: 0 }}>
                                        <span className="date">{group.lastMessage ? calculateTimeDisplay(group.lastMessage.time) : ''}</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={{ size: 12, offset: 0 }} >
                                        <span className="group-text">{group.lastMessage ? (group.lastMessage.text.length > 26 ? group.lastMessage.text.substr(0, 25) + "..." : group.lastMessage.text) : ''}</span>
                                    </Col>
                                </Row>
                            </Col>
                         </Row>
                        ))
                    }
            </FadeIn>


            <Modal animation={false} isOpen={isSearchModalOpen} toggle={() => setIsSearchModalOpen(!isSearchModalOpen)}>
                <ModalHeader toggle={() => setIsSearchModalOpen(!isSearchModalOpen)}>Search</ModalHeader>
                <ModalBody>
                    <Form autoComplete="off">
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username"
                                onChange={e => handleChange(e.target.value)} />
                        </FormGroup>
                        
                    </Form>
                    <Container className="scroll">
                    {[...Object.values(userReturn)]
                        .map((user, index) => (
                            <Row key={user._id} className="group" onClick={() => handleUserClick(user)}>
                                <Col xs="1" className="p-2 my-auto">
                                    <span className="fa fa-user-circle fa-2x"></span>
                                </Col>
                                <Col xs={{ size: 10, offset: 1 }}>
                                    <Row>
                                        <Col xs={{ size: 8, offset: 0 }}>
                                            <span className="group-title">{user.username}</span>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        ))
                    }
                    </Container>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default ChatGroups;