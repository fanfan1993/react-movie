import React from 'react';
import './loading.css';
import Logo from './svg.js';
const Loading=({loading})=>{
    return(
        <div className="min-loading" style={{height: !loading? '' : '0'}}>
           <Logo />
        </div>
    )
}

export default Loading