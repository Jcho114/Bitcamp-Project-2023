import React from 'react';
import './Alert.css';

const Alert = ({ message }) => {
    return (
        <div className='alert'>
            <h1>{message}</h1>
        </div>
    );
}

export default Alert;