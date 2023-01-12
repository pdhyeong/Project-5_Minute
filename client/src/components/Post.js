import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/LoginContext';
import NFTdata from '../assets/NFTdata';

const Post = ({setPostData,postData}) => {
    const {userInfo} = useContext(UserContext)
    const [likeToggle,setLikeToggle] = useState(false);
    const [awardToggle,setAwardToggle] = useState(false);

    const handleLikeClick = (e) => {
        console.log(likeToggle);
        e.preventDefault();
        if(likeToggle){
            setLikeToggle(false);
            let likeCount = postData?.like?postData.like-1 : 0;
            axios.post('http://localhost:8080/post/like',{
                "like": likeCount,
                "post_content" : postData.content,
            }).then(()=>{
                axios.get('http://localhost:8080/post')
                .then(res=>res.data)
                .then(res=>{
                    setPostData(res);
                })
            })
        }
        else{
            
            setLikeToggle(true);

            let likeCount = postData?.like? postData.like+1 : 0;
            axios.post('http://localhost:8080/post/like',{
                "like": likeCount,
                "post_content" : postData.content,
            }).then(()=>{
                axios.get('http://localhost:8080/post')
                .then(res=>res.data)
                .then(res=>{
                    setPostData(res);
                })
            })
        }
    }





    return (
        <div className='post'>
            <div className='post__profile'>
                {<img alt='img' src={postData?.profile_image}></img>}
            </div>
            <div className='post__contents'>
                <div className='post__contents__user'>
                    <h4>{postData?.user_name}</h4>
                    <span>@{postData?.user_name}</span>
                </div>
                <h2>{postData?.title}</h2>
                <p>
                {postData?.content}
                </p>
                <p>{postData?.hash_title.map((e,i)=>{
                    return <span className='hashtag'>&nbsp;{e}&nbsp;</span>
                })}</p>
                <div className='post__contents__interact'>
                    <div className='post__contents__interact__item green-hover'> 
                        <svg viewBox="0 0 24 24" aria-hidden="true"  className='green-hover'><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
                        <span className='green-hover'>{postData?.comments.length}</span>
                    </div>
                    <div 
                    onClick={handleLikeClick}
                    className='post__contents__interact__item pink-hover'> 
                    <svg viewBox="0 0 24 24" aria-hidden="true" className={likeToggle?'like-clicked':''} ><g><path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>
                        <span  className={likeToggle?'like-clicked':''}>{postData.like}</span>
                    </div>
                    <div 
                    onMouseOver={()=>{
                        setAwardToggle(true);
                    }}
                    onMouseOut={()=>{
                        setAwardToggle(false);
                    }}
                    className='post__contents__interact__item orange-hover'> 
                        <svg className={awardToggle?'award-clicked':''}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 464.628 464.628" enable-background="new 0 0 464.628 464.628">
                            <path d="m394.33,105.596h-76.136c22.944-22.372 37.216-53.596 37.216-88.096 0-9.665-7.835-17.5-17.5-17.5-44.786,0-84.057,24.045-105.596,59.9-21.539-35.855-60.81-59.9-105.595-59.9-9.665,0-17.5,7.835-17.5,17.5 0,34.5 14.273,65.724 37.216,88.096h-76.137c-9.665,0-17.5,7.835-17.5,17.5v324.033c0,9.665 7.835,17.5 17.5,17.5h324.032c9.665,0 17.5-7.835 17.5-17.5v-324.033c0-9.665-7.835-17.5-17.5-17.5zm-17.5,162.016h-127.016v-127.016h127.016v127.016zm-58.646-230.385c-7.525,32.765-33.378,58.618-66.144,66.143 7.526-32.766 33.379-58.619 66.144-66.143zm-105.596,66.142c-32.765-7.525-58.618-33.378-66.143-66.143 32.765,7.525 58.618,33.378 66.143,66.143zm2.226,37.227v127.016h-127.016v-127.016h127.016zm-127.016,162.016h127.016v127.017h-127.016v-127.017zm162.016,127.016v-127.016h127.016v127.017h-127.016z"/>
                        </svg>
                        <span className={awardToggle?'award-clicked':''} >Award</span>
                        {
                            awardToggle&&<div className='award-nft'>
                                <h2>Award</h2>
                                <div className='award-nft__container'>
                                {

                                    NFTdata.map((e,i)=>{
                                        return <div

                                        key = {e.id} className='award-nft__award' >
                                        <img src={e.image}></img>
                                        <p>{e.price}</p>
                                    </div>
                                    })
                                }
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;