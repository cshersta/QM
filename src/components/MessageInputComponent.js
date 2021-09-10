import React, { useState } from 'react';
import '../MessageInput.css';

const NewMessage = ({ socket, user }) => {
    const [value, setValue] = useState('');
    const message = { value, user };
    const submitForm = (e) => {
        e.preventDefault();
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