import React from 'react'
const LinkBtn = (props)=>{
    console.log(props.isLike)
    let handleSelLike = props.selLike
    return (
        // <section className="like_list">
        //      <div onClick={props.userName && !props.isLike ? (e) => { handleSelLike('1') } : props.isLike ? '' : (e) => { handleSelLike('needLogin') }} 
        //         className={'like '+ (props.isLike ? (props.isLike === '1' ? 'like_active' : 'likeDisable') : '')}>喜欢</div>
        //     <div onClick={props.userName && !props.isLike ? (e) => { handleSelLike('2') } : props.isLike ? '' : (e) => { handleSelLike('needLogin') }} 
        //         className={'like '+ (props.isLike ? (props.isLike === '2' ? 'like_active' : 'likeDisable') : '')}>不喜欢</div>
        // </section>
          <section className="like_list">
          <div onClick={ (e) => { handleSelLike('1') } } 
             className={'like '+ (props.isLike ? (props.isLike === '1' ? 'like_active' : 'likeDisable') : '')}>看过</div>
         <div onClick={  (e) => { handleSelLike('2') } } 
             className={'like '+ (props.isLike ? (props.isLike === '2' ? 'like_active' : 'likeDisable') : '')}>没看过</div>
     </section>
    )
}

export default LinkBtn