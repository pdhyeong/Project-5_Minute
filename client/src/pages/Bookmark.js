import React, { useState } from 'react';

const Bookmark = () => {
    const [bookmarkedData,setBookmarkedData] = useState(null);

    return (
        <div className='bookmark'>
            {bookmarkedData===null
                ?<div className='bookmark__no-content'>
                    <h1>포스트를 저장하세요!</h1>
                    <p> 다시 찾아보고 싶은 포스트를 잊기 전에 저장하세요! <br/> 저장된 포스트는 푹마크 탭에서 언제든지 쉽게 찾아볼 수 있습니다.</p>
                </div>
                :null
            }
        </div>
    );
};

export default Bookmark;