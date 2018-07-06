import React from 'react'
import {Link} from 'react-router-dom'
export const List = (props) => {
    let list = props.movieList;
    if(list.length===0){
        return (
            <section className="video_list">
            <div className="video_list_header">
                <h3><i className="iconfont icon-like"></i><span>{props.name}({list.length})</span></h3>
            </div>
            <div>
                暂无数据
            </div>
        </section>
        )
    }
    return (
        <section className="video_list">
            <div className="video_list_header">
                <h3><i className="iconfont icon-like"></i><span>{props.name}({list.length})</span></h3>
            </div>
            <ul>
                {
                list.map(function (item,i) {
                    return (
                        <li key={item.id}>
                            <Link to={'/subject/'+item.id}>
                                <div className="preImg"><img src={item.img} alt=""/></div>
                                <h3>{item.name}</h3>
                                <div className="starList" style={{'backgroundPositionY':-15*((Number(item.stars))/10).toFixed(0)+'px'}}></div>
                                <span id="fen">{item.average}</span>
                            </Link>
                        </li>
                    )})       
                }
            </ul>
        </section>
    )
}