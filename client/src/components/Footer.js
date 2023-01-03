import React from 'react';
import MyNft from './MyNft';
import MyRank from './MyRank';

const Footer = () => {
    return (
        <footer>
            <MyRank></MyRank>
            <MyNft></MyNft>
            
            © 2023 5Minutes, All right reserved.
        </footer>
    );
};

export default Footer;