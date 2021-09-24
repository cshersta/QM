import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import '../MessageInput.css';

const NewMessage = ({ socket, user, chatGroup }) => {
    const [value, setValue] = useState('');
    const message = { value, user, chatGroup };
    const submitForm = (e) => {
        e.preventDefault();
        console.log(chatGroup);
        socket.emit('message', message);
        setValue('');
    };

    return (
        <Row className="chat-input" >
            <Col xs={{ size: 8, offset: 2 }} className="my-auto" >
                <form onSubmit={submitForm}>
                    <input
                        autoFocus
                        value={value}
                        placeholder="Type your message"
                        onChange={(e) => {
                            setValue(e.currentTarget.value);
                        }}
                    />
                </form>
            </Col>
        </Row>
    );
};

export default NewMessage;