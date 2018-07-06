import React from 'react'
import {Link} from 'react-router-dom'
export default ()=>(
    <div id="searchTop">
        <Link to="/search">
            <div className="search_input">
                   搜索
                <div className="right_btn">
                    <i className="iconfont icon-search" ></i>
                </div>    
            </div>
        </Link>
    </div>
)