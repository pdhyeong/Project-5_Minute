import React, { useState, useContext, useEffect } from 'react';
import Footer from './components/Footer';
import { Routes,Route } from 'react-router-dom';
import Mypage from './pages/Mypage';
import SearchBar from './components/SearchBar';
import PostLayout from './components/PostLayout';
import Bookmark from './pages/Bookmark';
import Explore from './pages/Explore';
import MakePost from './pages/MakePost';
import { UserContext } from './context/LoginContext';
import SocialLogin from './components/SocialLogin';
import axios from 'axios';
import Redirect from './components/Redirect';
import SignIn from './components/SignIn';
import PostView from './components/PostView';


const Main = () => {
    const {accessToken, setAccessToken, userInfo, setUserInfo} = useContext(UserContext);
    const [Nft,setNft] = useState([]);
    const [postData,setPostData] = useState([]);
    const [isFetchingNft,setIsFetcingNft] = useState(false);
    console.log(Nft);
    
    const getUserNft = async (address) => {
        const response = await axios.get(`http://localhost:8080/nft?address=${address}`);
        if(!response.ok) new Error(response.statusText);
        setNft(response.data);
        
        console.log(Nft);
    }
    const getPostData = async () => {
        axios.get('http://localhost:8080/post')
        .then(res=>res.data)
        .then(res=>{
            setPostData(res);
            console.log(postData);
        })
    }


    const getUserInfoByAccessToken = async (accessToken) => {
        
        const result = await axios
            .get("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            })
            .then(res => res.data)
            .catch(err=>{               
                console.log('token expired',err);
                localStorage.clear();
                setAccessToken(null);
            });
         return result
    };    



    useEffect(()=>{
        const storedAccessToken =  localStorage.getItem('accessToken');
        if(storedAccessToken===null&&accessToken){
            localStorage.setItem('accessToken',accessToken);
            // getUserInfoByAccessToken(accessToken)
            // .then((result)=>{
            //     console.log(result);
            //     // setUserInfo(result);
            // })
            
        }
        else if(accessToken===null&&storedAccessToken){
            setAccessToken(storedAccessToken);
            // console.log('Logged In')
        }
        else{
            // console.log('Logged Out');
        }
    },[accessToken]);

    useEffect(()=>{
        const storedUserInfo =  JSON.parse(localStorage.getItem('userInfo'));
        if(storedUserInfo===null&&userInfo.id!==null){

            localStorage.setItem('userInfo',JSON.stringify(userInfo));
            
        }
        else if(userInfo.id===null&&storedUserInfo!==null){
            setUserInfo(storedUserInfo);
            // console.log('Logged In')
        }
        else{
            // console.log('Logged Out');
        }
    },[userInfo]);
    
    useEffect(()=>{
        const storedUserInfo =  JSON.parse(localStorage.getItem('userInfo'));
        if(storedUserInfo){
            setIsFetcingNft(true);
            getUserNft(storedUserInfo.address)
            .then(()=>{
                setIsFetcingNft(false);
            });
        }
        getPostData();
    },[]);


    return (
        <main className='main'>
            <div className='main-contents-container'>
                <SearchBar></SearchBar>
                <Routes>
                    <Route path='/' element={<PostLayout setPostData={setPostData} postData={postData} />}></Route>
                    <Route path='/mypage' element={accessToken?<Mypage setPostData={setPostData} postData={postData} Nft={Nft} isFetchingNft={isFetchingNft}></Mypage>:<Redirect></Redirect>}></Route>
                    <Route path='/bookmark' element={accessToken?<Bookmark></Bookmark>:<Redirect></Redirect>}></Route>
                    <Route path='/explore' element={<Explore setPostData={setPostData} postData={postData}></Explore>}></Route>
                    <Route path='/post' element={accessToken?<MakePost></MakePost>:<Redirect></Redirect>}></Route>
                    <Route path='/redirect' element={<SocialLogin></SocialLogin>}></Route>
                    <Route path='/signin' element={<SignIn></SignIn>}></Route>
                    <Route path='/detail/:postid' element={<PostView setPostData={setPostData} postData={postData}></PostView>}></Route>
                </Routes>
            </div>
            <div className='main-footer-container'>
                <Footer Nft={Nft} isFetchingNft={isFetchingNft}></Footer>
            </div>
        </main>
    );
};

export default Main;