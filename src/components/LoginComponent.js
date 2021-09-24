import React, { useState } from 'react';
import {
    Button, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody, Container, Row, Col
} from 'reactstrap';

const Login = ({ loginForm, chatGroupReturn, signUpForm, socket }) => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    function handleLogin(e) {
        e.preventDefault();
        socket.emit('getSelfChatGroup', userName, function (chatGroup) {
            chatGroupReturn(chatGroup);
            loginForm(userName);
        });
    }

    function handleSignUp(e) {
        e.preventDefault();
        const newUser = { userName, password };
        socket.emit('signUp', newUser);
        setUserName('');
        setPassword('');
        signUpForm(userName);
    }

        return (
            <Container className="login" >
                <Row>
                    <Col>
                        <Button outline onClick={() => setIsLoginModalOpen(!isLoginModalOpen)} ><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                        <Button outline onClick={() => setIsSignUpModalOpen(!isSignUpModalOpen)} ><span className="fa fa-user-plus fa-lg"></span> Sign Up</Button>
                    </Col>
                </Row>
                <Modal animation={false} isOpen={isLoginModalOpen} toggle={() => setIsLoginModalOpen(!isLoginModalOpen)}>
                    <ModalHeader toggle={() => setIsLoginModalOpen(!isLoginModalOpen)}>Login</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text"
                                    id="username"
                                    name="username"
                                    onChange={e => setUserName(e.target.value)}
                                    value={userName}
                                />
                            </FormGroup>
                            <Button outline type="submit" value="submit" color="primary" ><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal animation={false} isOpen={isSignUpModalOpen} toggle={() => setIsSignUpModalOpen(!isSignUpModalOpen)}>
                    <ModalHeader toggle={() => setIsSignUpModalOpen(!isSignUpModalOpen)}>Sign Up</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={handleSignUp}>
                            <FormGroup>
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username1" name="username"
                                    onChange={e => setUserName(e.target.value)} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" name="password"
                                    onChange={e => setPassword(e.target.value)} />
                            </FormGroup>
                            <Button outline type="submit" value="submit" color="primary" ><span className="fa fa-user-plus fa-lg"></span> Sign Up</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </Container>

        );
};

export default Login;