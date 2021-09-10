import React, { useEffect, useState } from 'react';
import {
    Button, Form, FormGroup, Input, Label
} from 'reactstrap';

const Login = ({ loginForm }) => {
    const [userName, setUserName] = useState("");

        return (
            <div>
                <Form onSubmit={() => loginForm(userName)}>
                    <FormGroup>
                        <Label htmlFor="username">Username</Label>
                        <Input type="text"
                            id="username"
                            name="username"
                            onChange={e => setUserName(e.target.value)}
                            value={userName}
                        />
                    </FormGroup>
                  
                    <Button type="submit" value="submit" color="primary">Login</Button>
                </Form>
            </div>
        );
};

export default Login;