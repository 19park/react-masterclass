import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Container = styled.div`
    padding: 40px 20px;
    max-width: 500px;
    margin: 0 auto;
    text-align: center;
    color: ${props => props.theme.boxColor};

    h1 {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 25px;
    }
    a {
        background-color: ${props => props.theme.boxColor};
        color: ${props => props.theme.textColor};
        padding: 8px 20px;
        border-radius: 10px;
    }
`;

const NotFound = () => (
  <Container>
    <h1>404 - Not Found!</h1>
    <Link to="/">Go Home</Link>
  </Container>
);

export default NotFound;