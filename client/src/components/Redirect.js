import React, { useEffect } from 'react';

const Redirect = () => {
    useEffect(()=>{
        window.location.assign('http://localhost:3000');
    },[])

    return (
        <div>
        </div>
    );
};

export default Redirect;