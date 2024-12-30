import React from 'react';
import Container from './Container';
import { Button, Avatar } from 'antd';
import './Footer.css';

const Footer = (props) => (
    <div className='footer'>
        <Container>
            {props.numberOfUsers !== undefined ?
                <Avatar 
                    style={{backgroundColor: '#f56a00', marginRight: '5px'}}
                    size='large'>{props.numberOfUsers}</Avatar> : null
            }
            <Button onClick={() => props.handleAddUserClickEvent()} type='primary'>Add new user +</Button>
        </Container>
    </div>
);

export default Footer;