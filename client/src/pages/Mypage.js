/* eslint-disable no-undef */
import React, { useState,useEffect } from 'react';
import profile from '../assets/레오쓰.jpeg'
import Post from '../components/Post';


const Mypage = () => {
    const [tap,setTap] = useState(0);
    const SERVER_URL = '';
    const [image,setImage] = useState({
        image_file: '',
        preview_URL: profile,
    });

    const handleImgInputChange = (e) =>{
        const newImageFile = e.target.files[0];
        const formData = new FormData();

        formData.append('newImageFile',newImageFile);

        for(const keyvalue of formData){
            console.log(keyvalue);
        }

        if(newImageFile){
            // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
            URL.revokeObjectURL(image.preview_URL);
            const preview_URL = URL.createObjectURL(newImageFile);
            setImage({
              image_file: newImageFile,
              preview_URL,
            })
          }
    }

    const postImageToServer = async () => {
        if(image.image_file){
            const formData = new FormData()
            formData.append('file', image.image_file);
            await axios.post( SERVER_URL , formData);
            alert("서버에 등록이 완료되었습니다!");
            setImage({
              image_file: "",
              preview_URL: "img/default_image.png",
            });
          }
          else{
            alert("사진을 등록하세요!")
          }
    }

    useEffect(()=>{
        return URL.revokeObjectURL(image.preview_URL);
    },[])

    return (
        <div className='mypage'>
            <div className='mypage__background'>
                <div className='mypage__background__profile__img'>
                    <img src={image.preview_URL}></img>
                    {/* <img src={image.preview_URL}></img> */}
                </div>

            </div>
            <div className='mypage__background__spacer'>
                <label for='img_file'>
                    <h5>프로필 사진 업로드</h5>
                    <svg viewBox="0 0 24 24" aria-hidden="true" fill='#f7f9f9' width="30px"><g><path d="M3 5.5C3 4.119 4.119 3 5.5 3h13C19.881 3 21 4.119 21 5.5v13c0 1.381-1.119 2.5-2.5 2.5h-13C4.119 21 3 19.881 3 18.5v-13zM5.5 5c-.276 0-.5.224-.5.5v9.086l3-3 3 3 5-5 3 3V5.5c0-.276-.224-.5-.5-.5h-13zM19 15.414l-3-3-5 5-3-3-3 3V18.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-3.086zM9.75 7C8.784 7 8 7.784 8 8.75s.784 1.75 1.75 1.75 1.75-.784 1.75-1.75S10.716 7 9.75 7z"></path></g></svg>
                </label>
                <input type='file'
                    accept='image/*'
                    name= 'post_img'
                    className='createpost__img-input'
                    id='img_file'
                    onChange={handleImgInputChange}
                    onClick={e=>e.target.value = null}>
                    
                </input>
            </div>
            <div className='mypage__profile__contents'>
                <h3>zinoopark</h3>
                <span>@zinoo_park</span>
                <p>가입일: 2022년 10월</p>
                <div>
                    획득 뱃지 <span>a</span><span>b</span><span>c</span><span>d</span>
                </div>
            </div>
            <div className='mypage__contents'>
                <div className='mypage__contents__tap'>
                    <div onClick={()=>{setTap(0)}} className={tap===0?'mypage__contents__tap__item tap-hover':'mypage__contents__tap__item'}>RANK</div>
                    <div onClick={()=>{setTap(1)}} className={tap===1?'mypage__contents__tap__item tap-hover':'mypage__contents__tap__item'} >POST</div>
                </div>
                {
                    tap===1&&<div>
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                        <Post></Post>
                    </div>
                    
                }
            </div>
        </div>
    );
};

export default Mypage;