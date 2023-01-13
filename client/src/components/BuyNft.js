import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import logo from '../assets/logo.png';
import NFTdata from '../assets/NFTdata';
import { UserContext } from '../context/LoginContext';
import Loading from './Loading';

const BuyNft = () => {
    const { userInfo} = useContext(UserContext);
    const navigate = useNavigate();
    const {id} = useParams();
    const [searchParams, setSearchParams]= useSearchParams();
    const [isLoading,setIsLoading] = useState(false);

    const user_name = searchParams.get('user_name');
    const address = searchParams.get('address');


    const handleCloseButtonClick = () => {
        navigate(-1);
    }

    const handleNftBuyButton = () => {
        if(userInfo.token_amount < NFTdata[id].price){
            alert(`토큰이 부족합니다.`);
        }
        else{
            setIsLoading(true);
            axios.post('http://localhost:8080/buynft',{
                "nft_id": id,
                "sender_address": userInfo.address,
                "recipient_address": address,
            })
            .then((res)=>{
                console.log(res);
                setIsLoading(false);
                navigate('/');

            })
            .catch(err=>{
                console.log(err);
            })
            
        }
    }

    return (
        <div className='signin'>
        <div className='signin__modal'>
            <div className='signin__modal__header'>
                <div 
                className='signin__modal__header__close-button'
                onClick={handleCloseButtonClick}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true"  fill="white"><g><path d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"></path></g></svg>
                </div>
                <div className='signin__modal__header__logo'>
                    <img src={logo}></img>
                </div>
            </div>
            {isLoading
            ?<Loading></Loading>
            :<>
                <div className='buynft-container'>
                    <div>
                        <img src={NFTdata[id].image}></img>
                        <div>
                            <p><span>@{userInfo?.email.split('@')[0]}</span>님</p>
                            <h4>{NFTdata[id].name}를</h4>
                            <span>
                                <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7.9 18.8h3.8c3.9 0 7.1-3.8 7.1-8.5s-3.2-8.5-7.1-8.5H7.9" fill="#FFD635" stroke="#000" stroke-miterlimit="10" stroke-width="1.25"></path><path d="M8.2 1.8c-3.9 0-7 3.8-7 8.5s3.1 8.5 7 8.5 7-3.8 7-8.5-3.1-8.5-7-8.5z" fill="#FFD635" stroke="#000" stroke-miterlimit="10" stroke-width="1.25"></path><path d="M6.2 14.4c-.6-.4-1.2-1-1.5-1.7-.4-.8-.6-1.6-.6-2.4 0-.8.2-1.7.6-2.4.3-.8.8-1.4 1.5-1.8.6-.4 1.3-.6 2-.6.4 0 .8.1 1.2.2.4.1.8.3 1.1.6l-.7 1.8c-.1-.2-.4-.4-.7-.5-.3-.2-.6-.2-.9-.2-.4 0-.8.1-1.2.3-.4.3-.7.6-.9 1-.2.5-.3 1-.3 1.5s.1 1 .3 1.5c.2.4.5.8.9 1 .4.3.8.4 1.2.4.3 0 .6-.1.9-.2.3-.1.5-.3.7-.5l.6 1.8c-.3.2-.7.4-1.1.6-.3.1-.7.2-1.1.2-.7 0-1.4-.2-2-.6z"></path><path d="M11.6 1.1H7.9C3.9 1.4.7 5.3.7 10.2s3.2 8.9 7.2 9.1h3.8c4.3 0 7.7-4.1 7.7-9.1s-3.5-9.1-7.8-9.1zm-9.7 9.1c0-4.3 2.9-7.9 6.4-7.9s6.4 3.5 6.4 7.9-2.9 7.9-6.4 7.9-6.4-3.5-6.4-7.9zm10.2 7.9c2.4-1.9 3.8-4.8 3.8-7.8.1-3.1-1.3-6-3.8-7.9 3.3.3 6 3.7 6 7.8s-2.6 7.6-6 7.9z"></path><path d="m10.5 14.2-.6-1.8c-.2.2-.4.4-.7.5-.3.1-.6.2-.9.2-.4 0-.9-.1-1.2-.4-.4-.3-.7-.6-.9-1-.2-.5-.3-1-.3-1.5s.1-1 .3-1.5c.1-.4.4-.7.8-1 .4-.2.8-.4 1.2-.4.3 0 .6.1.9.2.3.1.5.3.7.5l.6-1.8c-.3-.2-.6-.4-1-.5-.4-.1-.8-.2-1.2-.2-.7 0-1.4.2-2 .6-.7.4-1.2 1-1.5 1.7-.4.8-.6 1.6-.6 2.4 0 .8.2 1.7.6 2.4.3.8.8 1.4 1.5 1.8.6.4 1.3.6 2 .6.4 0 .8-.1 1.2-.2.4-.1.8-.3 1.1-.6z"></path></svg>
                                {NFTdata[id].price}
                                <p> &nbsp;을 사용하여</p>
                            </span>
                            <p><span>@{user_name}</span>님께 선물하시겠습니까?</p>
                        </div>
                    </div>
                </div>
                <div className='signin__modal__input-container__button buy-button'>
                    <button
                    onClick={handleNftBuyButton}
                    >선물하기</button>
                </div>
            </>}
        </div>
        
    </div>
    );
};

export default BuyNft;