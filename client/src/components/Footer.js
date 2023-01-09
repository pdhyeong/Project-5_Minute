import React, { useContext } from 'react';
import { UserContext } from '../context/LoginContext';
import MyNft from './MyNft';
import MyRank from './MyRank';

const Footer = () => {
    const {accessToken} = useContext(UserContext);

    return (
        <footer className='footer'>
            {accessToken&&<MyRank></MyRank>}
            {accessToken&&<MyNft></MyNft>}
            
            <div className='footer__copyright'>© 2023 5Minutes, All right reserved.</div>
        </footer>
    );
};

export default Footer;