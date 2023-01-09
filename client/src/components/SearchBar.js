import React, { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounce';

const SearchBar = () => {
    const [isFocused,setIsFocused] = useState(false);
    const [searchInput,setSearchInput] = useState('');
    const [posts,setPosts] = useState(null);

    const debounceValue = useDebounce(searchInput);

    useEffect(()=>{
        const getPosts = async () =>{
            return await fetch(`https://restcountries.com/v3.1/name/${debounceValue}`)
            .then(res=>{
                if(!res.ok) {
                    setPosts(null)
                    return new Promise.reject("no answer")
                };
                return res.json();
            })
            .then(list=>{

                if(list) setPosts(list)
                console.log(posts)
            })
            .catch( err => console.log(err) )
        }
        if(debounceValue) getPosts();

    },[debounceValue]);


    return (
        <div className='searchbar'>
            <div className='searchbar__container'>
                <div className='searchbar__container__svg'>
                    <svg viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g></svg>
                </div>
                
                <input 
                onChange={(e)=>{
                    setSearchInput(e.target.value);
                }}
                onFocus={()=>setIsFocused(true)} onBlur={()=>setIsFocused(false)} className='searchbar__container__input' placeholder='Algora states 검색'></input>
            </div>
            {
                isFocused && <div className='searchbar__searchlist'>
                    {
                    posts===null
                    ?<div className='searchbar__searchlist-container'>
                        사용자, 문제, 키워드를 검색해보세요
                    </div>
                    // :null
                    :posts.map(e=>{
                        return <p>{e.borders}</p>
                    })
                    }
                </div>
            }
        </div>
    );
};

export default SearchBar;