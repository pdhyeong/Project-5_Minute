import React from 'react';
import Post from '../components/Post';
import RecommendTag from '../components/RecommendTag';

const Explore = () => {
    return (
        <div className='explore'>
            <div className='explore__recommend'>
                <h3>당신을 위한 추천태그 #</h3>
                <RecommendTag></RecommendTag>
                <RecommendTag></RecommendTag>
                <RecommendTag></RecommendTag>
                <RecommendTag></RecommendTag>
            </div>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <div className='explore__content'></div>
        </div>
    );
};

export default Explore;