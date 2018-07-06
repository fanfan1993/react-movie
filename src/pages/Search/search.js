import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import './search.css'
import { search } from '../../http/index'

class Search extends Component{
    constructor(props){
        super(props)
        this.doSearch = this.doSearch.bind(this)
        this.state = {
            searchResult:null
        }
    }
    doSearch(e){
        console.log(e.target.value)
        search(e.target.value).then(res=>{
            console.log(res)
            this.setState({
                searchResult:res.subjects
            })
        })
    }
    render(){
        let {searchResult} = this.state
        return (
            <div>
                <section id="search_main">
                    <div id="search">
                        <input type="text" autoFocus="autofocus" onChange={this.doSearch} />
                        <i className="iconfont icon-search"></i>
                        <Link to="/"><span>取消</span></Link>
                    </div>
                    <div className="search_title">
                        搜索结果
                    </div>
                        {
                            searchResult && searchResult.length > 0 ?
                            <ul>
                                {
                                    searchResult.map(val => (
                                        <li key={val.id}>
                                            <Link to={'/subject/'+val.id}>
                                                <img src={val.images.small} alt="图片" />
                                                <div className="result_name">
                                                    <p>{val.title}</p>
                                                    <p>{val.rating.average}分/{val.durations[0]} </p>
                                                </div>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                            : (searchResult !== null ? <div className = "not_find"> 没有相关影片 </div> : '')
                        }
                </section>
            </div>
        )
    }
}
export default Search