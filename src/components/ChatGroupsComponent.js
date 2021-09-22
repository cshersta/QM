import React, { useEffect, useState } from 'react';
import {
    Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody
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


    return (
        <div className="col-3">
            <div>
                {[...Object.values(groups)]
                    .map((group) => (
                        <div key={group._id} styles="cursor:pointer" className="group-container" onClick={()=>handleGroupClick(group)}>
                            <span className="user">{group.users.length > 1 ? _.without(group.users, user) : user}</span>
                            <span className="message">{group.lastMessage ? group.lastMessage.text : '' }</span>
                        </div>
                    ))
                }

            </div>



            <div className="col-2">
                <Button outline onClick={() => setIsSearchModalOpen(!isSearchModalOpen)}><span className="fa fa-comment fa-lg"></span></Button>
            </div>
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