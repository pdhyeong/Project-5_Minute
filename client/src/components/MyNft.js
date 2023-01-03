import React from 'react';

const MyNft = () => {
    const nft = ['a','b','c','d','e'];
    return (
        <div className='mynft'>
            <h2>내가 얻은 NFT들</h2>
            {   
                <div className='mynft__nft__container'>
                {
                    nft.map(e=>{
                        return <div className='mynft__nft' >{e}</div>
                    })
                }
                </div>
            }
        </div>
    );
};

export default MyNft;