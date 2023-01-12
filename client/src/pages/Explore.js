import React from 'react';
import { Link } from 'react-router-dom';
import Post from '../components/Post';
import RecommendTag from '../components/RecommendTag';

const Explore = ({setPostData,postData}) => {
    return (
        <div className='explore'>
            <div className='explore__recommend'>
                <h3>당신을 위한 추천태그 #</h3>
                <RecommendTag></RecommendTag>
                <RecommendTag></RecommendTag>
                <RecommendTag></RecommendTag>
                <RecommendTag></RecommendTag>
            </div>
            {
                postData.length!==0&&[...postData].reverse().map((e,i)=>{
                    return <Link key={i} to={'../detail/'+i}>
                        <Post setPostData={setPostData}  postData={e}></Post>
                    </Link>
                })
            }
            <div className='explore__content'>
                
            </div>
        </div>
    );
};

export default Explore;