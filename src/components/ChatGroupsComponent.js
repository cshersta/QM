import React, { useEffect, useState } from 'react';
import {
    Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, Row, Col
} from 'reactstrap';
var _ = require('lodash');

export const ChatGroups = ({ user, socket, chatGroupReturn }) => {

    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const [userSearch, setUserSearch] = useState('');
    const [userReturn, setUserReturn] = useState('');
    const [groups, setGroups] = useState('');

    useEffect(() => {
        const chatGroupListener = (group) => {
            console.log("chatGroupListener ");
            console.log(group);
            
            setGroups(group);
            _.forEach(groups, function (group) {
                //console.log("forEach group");
                //console.log(group);
            });
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
        chatGroupReturn([group]);
    }

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        console.log(userSearch);
        socket.emit('getUser', userSearch, function (userTemp) {
            console.log(userTemp);
            setUserReturn(userTemp);
            console.log(userReturn);
            let userArray = [userTemp.username, user];
            socket.emit('getChatGroup', userArray, function (chatGroup) {
                console.log(chatGroup);
                chatGroupReturn(chatGroup);
            });
        });
        setUserSearch('');
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


    return (
        <div>
            <Row className="group-header" >
                <Col xs="6" className="my-auto" >
                    <Button outline>{user} <span className="fa fa-bars fa-lg"></span></Button>
                </Col>
                <Col xs={{ size: 1, offset: 3 }} className="my-auto">
                    <Button outline onClick={() => setIsSearchModalOpen(!isSearchModalOpen)}><span className="fa fa-comment fa-lg"></span></Button>
                </Col>
            </Row>
                {[...Object.values(groups)]
                .map((group) => (
                    <Row key={group._id} className="groups"   onClick={() => handleGroupClick(group)}>
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

            <Modal animation={false} isOpen={isSearchModalOpen} toggle={() => setIsSearchModalOpen(!isSearchModalOpen)}>
                <ModalHeader toggle={() => setIsSearchModalOpen(!isSearchModalOpen)}>Search</ModalHeader>
                <ModalBody>
                    <Form onSubmit={handleSearchSubmit}>
                        <FormGroup>
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username"
                                onChange={e => setUserSearch(e.target.value)} />
                        </FormGroup>
                        <Button outline type="submit" value="submit" color="primary" ><span className="fa fa-search fa-lg"></span> Search</Button>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    );
};

export default ChatGroups;