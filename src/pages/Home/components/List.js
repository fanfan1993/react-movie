import React from 'react'
import {Link} from 'react-router-dom'
export const List = (props) => {
    let list = props.movieList;
    return (
        <section className="video_list">
            <div className="video_list_header">
                <h3>{props.name}<span>({list.length})</span></h3>
                <Link to={props.link}>更多 <i className="iconfont icon-jiantouyou"></i></Link>   
            </div>
            <ul>
                {
                list.map(function (item,i) {
                    return (
                        <li key={item.id}>
                            <Link to={'/subject/'+item.id}>
                                <div className="preImg"><img src={item.images.medium} alt=""/></div>
                                <h3>{item.title}</h3>
                                <div className="starList" style={{'backgroundPositionY':-15*((Number(item.rating.stars))/20).toFixed(0)+'px'}}></div>
                                <span id="fen">{item.rating.average}</span>
                            </Link>
                        </li>
                    )})
                }
            </ul>
        </section>
    )
}