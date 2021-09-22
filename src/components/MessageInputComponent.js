import React, { useState } from 'react';
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
    );
};

export default NewMessage;