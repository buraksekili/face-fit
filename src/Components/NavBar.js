import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/face_fit_logo.png"

const Styles = styled.div`
    .navbar {
        background-color: grey;
        margin-bottom: 20px;
    }

    a,
    .navbar-nav {
        color: black;
        padding: 5px;
        &:hover {
            color: white;
        }
    }
`;

export const NavBar = () => {
    return (
        <Styles>
            <Navbar expand="lg">
                <Navbar.Brand href="/">
                    <img
                        alt="FaceFit Logo"
                        src={Logo}
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                    />{' '}
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="ml-auto">
                        <Nav.Item>
                            <Link to="/">Home</Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Link to="/about">About</Link>
                        </Nav.Item>

                        <Nav.Item>
                            <Link to="/contact">Contact</Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Styles>
    );
};
