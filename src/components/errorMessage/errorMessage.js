import React from 'react';
import img from './error.jpg';
import styled from 'styled-components';

const ErrorImg = styled.img `
    max-width: 100%;
`

const ErrorMsg = styled.span`
    margin: 0 auto;
    text-align: center;
`

const ErrorMessage = () => {
    return (
        <>
            <ErrorImg src={img} alt='error'></ErrorImg>
            <ErrorMsg>Something went wrong</ErrorMsg>
        </>
    )
}

export default ErrorMessage;