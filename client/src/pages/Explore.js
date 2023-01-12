import React from 'react';
import { Link } from 'react-router-dom';
import Post from '../components/Post';
import RecommendTag from '../components/RecommendTag';

const Explore = ({postData}) => {
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
                postData.length!==0&&postData.map((e,i)=>{
                    return <Link to={'detail/'+i}>
                        <Post key={i} postData={e}></Post>
                    </Link>
                })
            }
            <div className='explore__content'></div>
        </div>
    );
};

export default Explore;