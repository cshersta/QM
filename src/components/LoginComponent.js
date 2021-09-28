import React, { useState } from 'react';
import {
    Button, Label, Modal, ModalHeader, ModalBody, Container, Row, Col
} from 'reactstrap';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup"


const Login = ({ loginForm, chatGroupReturn, signUpForm, socket }) => {
    const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [err, setErr] = useState("");


    const SignupSchema = Yup.object().shape({
        username: Yup.string()
            .min(2, ' too short!')
            .max(15, ' too long!')
            .required(' required'),
        password: Yup.string()
            .min(4, ' too short!')
            .max(20, ' too long!')
            .required(' required'),
    });

    function validateUsername(value) {
        socket.emit('getUser', value, function (userReturn) {
            if (value === 'admin' || userReturn.hasOwnProperty('username')) {
                setErr('invalid username');
                return 'invalid username';
            }
            else {
                setErr('');
                return '';
            }
        });
    }

        return (
            <Container className="login" >
                <Row className="p-4" >
                    <Col xs={{ size: 9, offset: 2 }}>
                        <a className="btn btn-social-icon" href="https://www.linkedin.com/in/cody-sherstan-ab5a1315a/">A project by Cody Sherstan <i className="fa fa-linkedin fa-2x"></i></a>
                    </Col>
                </Row>
                <Row className="p-4" >
                    <Col xs={{ size: 9, offset: 3 }}>
                        <Button outline onClick={() => setIsLoginModalOpen(!isLoginModalOpen)} ><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                        <Button outline onClick={() => setIsSignUpModalOpen(!isSignUpModalOpen)} ><span className="fa fa-user-plus fa-lg"></span> Sign Up</Button>
                    </Col>
                </Row>
                <Row className="p-4" >
                    <Col xs={{ size: 2, offset: 5 }}>
                        <a className="btn btn-social-icon" href="https://bitbucket.org/cshersta/workspace/projects/QM"><i className="fa fa-github fa-3x"></i></a>
                    </Col>
                </Row>
                <Modal animation={false} isOpen={isLoginModalOpen} toggle={() => setIsLoginModalOpen(!isLoginModalOpen)}>
                    <ModalHeader toggle={() => setIsLoginModalOpen(!isLoginModalOpen)}>Login</ModalHeader>
                    <ModalBody>
                        <Formik
                            initialValues={{
                                username: '',
                                password: '',
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={(values, actions) => {
                                console.log(values);
                                socket.emit('authenticate', values, function (authReturn) {
                                    console.log(authReturn);
                                    if (authReturn.hasOwnProperty('code')) {
                                        console.log(authReturn.code);
                                        setErr("Login Failed");
                                    }
                                    else if (Object.entries(authReturn).length === 0) {
                                        setErr("Login Failed");
                                    }
                                    else {
                                        socket.emit('getSelfChatGroup', authReturn.username, function (chatGroup) {
                                            chatGroupReturn(chatGroup); // this should be set at the initialization of the chatgroup component
                                            loginForm(authReturn.username);
                                        });
                                    }
                                });
                                
                            }}
                        >
                            {({ errors, touched, isValid }) => (
                                <Form>
                                    <Label htmlFor="username">Username</Label><span className="err">  <ErrorMessage name="username" />{err}</span>
                                    <Field className="form-control" name="username" />
                                    <Label htmlFor="password">Password</Label><span className="err">  <ErrorMessage name="password" /></span>
                                    <Field className="form-control" name="password" type="password" />
                                    <Button outline type="submit" value="submit" color="primary" ><span className="fa fa-sign-in fa-lg"></span> Login</Button>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                </Modal>
                <Modal animation={false} isOpen={isSignUpModalOpen} toggle={() => setIsSignUpModalOpen(!isSignUpModalOpen)}>
                    <ModalHeader toggle={() => setIsSignUpModalOpen(!isSignUpModalOpen)}>Sign Up</ModalHeader>
                    <ModalBody>
                        <Formik
                            initialValues={{
                                username: '',
                                password: '',
                            }}
                            validationSchema={SignupSchema}
                            onSubmit={(values, actions) => {
                                socket.emit('signUp', { userName:values.username, password:values.password }, function (signUpReturn) {
                                    console.log(signUpReturn);
                                    if (signUpReturn.hasOwnProperty('code')) {
                                        console.log(signUpReturn.code);
                                        setErr("Sign up Failed");
                                    }
                                    else {
                                        socket.emit('getSelfChatGroup', signUpReturn.username, function (chatGroup) {
                                            chatGroupReturn(chatGroup); // this should be set at the initialization of the chatgroup component
                                            loginForm(signUpReturn.username);
                                        });
                                    }
                                });
                            }}
                            
                        >
                            {({ errors, touched, isValid }) => (
                                <Form>
                                    <Label htmlFor="username">Username</Label><span className="err">  <ErrorMessage name="username" />{err}</span>
                                    <Field className="form-control" name="username" validate={validateUsername} />
                                    <Label htmlFor="password">Password</Label>
                                    <span data-toggle="tooltip"  title="Please note: passwords are not currently encrypted. Don't use your good passwords." className="btn fa fa-info-circle"></span>
                                    <span className="err">  <ErrorMessage name="password" /></span>
                                    <Field className="form-control" name="password" type="password" />
                                    <Button outline type="submit" value="submit" color="primary" disabled={!isValid} ><span className="fa fa-user-plus fa-lg"></span> Sign Up</Button>
                             </Form>
                           )}
                         </Formik>
                    </ModalBody>
                </Modal>
            </Container>

        );
};

export default Login;