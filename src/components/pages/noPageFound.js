import React, {Component} from 'react';
import styled from 'styled-components';

export default class NoPageFound extends Component {
    render() {
        return (
            <NoPage>Unfortunately, we couldn't find this page</NoPage>
        )
    }
}

const NoPage = styled.h1`
    color: #fff;
`