import React, {Component} from 'react';
import './noPageFound.css';
import {Link} from 'react-router-dom';

export default class NoPageFound extends Component {
    render() {
        return (
            <>
            <h1>Unfortunately, we couldn't find this page</h1>
            <Link to='/' style={{ color: '#FFF' }} className='toggle-btn'>Go Home</Link>
            </>
        )
    }
}

