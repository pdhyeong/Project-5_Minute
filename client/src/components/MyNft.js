import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/LoginContext';
import Loading from './Loading';

const MyNft = ({Nft,isFetchingNft}) => {
    const {userInfo} = useContext(UserContext);


    return (
        <div className='mynft'>
            <h2>내가 얻은 NFT들</h2>
            {   
                <div className='mynft__nft__container'>
                {
                    isFetchingNft
                    ?<Loading></Loading>
                    :Nft.length!==0&&Nft.map((e,i)=>{
                        return <div key = {i} className='mynft__nft' >
                            <img src={e.image}></img>
                            <p>{e.name}</p>
                        </div>
                    })
                }
                </div>
            }
        </div>
    );
};

export default MyNft;