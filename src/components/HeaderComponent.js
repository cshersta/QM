import React, { useEffect, useState } from 'react';
import {
    Button, Form, FormGroup, Input, Label
} from 'reactstrap';

const Header = ({ logout, user }) => {


    return (
            <div className="container">
                <div className="row app-header">
                    
                    <div className="col-2">
                        {user ? (
                        user
                        ): ('')}
                    </div>
                    
                    {user ? (
                        <div className="col-2">
                            <span className="fa fa-search fa-lg"></span>
                        </div>
                    ) : ('')}
                    
                    
                    <div className="col-2">
                        <h1>QM</h1>
                </div>
                <div className="col-2 logout_button">
                    {user ? (
                        <Button outline onClick={() => logout()}><span className="fa fa-sign-out fa-lg"></span> Logout</Button>
                    ) : ('')}
                </div>
                </div>
            </div>
    );
};

export default Header;