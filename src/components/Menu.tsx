import React, {useEffect, useState} from "react";
import {Navbar, Nav} from "react-bootstrap";
import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <div className="container">
                <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/tutoriales">Tutoriales</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>

    );
};

export default Menu;