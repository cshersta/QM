import React from 'react';
import {
    Button
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
                    
                    <div className="col-6">
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