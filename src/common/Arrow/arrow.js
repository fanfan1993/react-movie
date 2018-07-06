import React from 'react'
import arrow from '../../images/arrow.png';
import './arrow.css'
const Arrow = ({rotate,hidden}) => {
    if (hidden){
        return  <div className="arrowWrap"><img className={rotate > 50 ? 'rotate' : ''} src={arrow} alt=""/></div>
    }else{
        return ''
    }
}
export default Arrow