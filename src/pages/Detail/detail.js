import React, {Component} from "react";
import './detail.css'
import { detailList} from '../../http/index'
import Loading from '../../common/Loading/loading'
import { connect } from 'react-redux'
import { showToast,likeMovies } from "../../store/action";
import {bindActionCreators} from 'redux'
import Arrow from '../../common/Arrow/arrow'
import LinkBtn from './components/likeBtn'
import {Link} from 'react-router-dom'

class Detail extends Component{
    constructor(props){
        super(props)
        this.state = {
            movieData:null,
            movieId:this.props.match.params.id,
            loadDone:false,
            pStart: 0,
            pScroll: 0,
            isPullDown: false,
            isStart: false,
            isLike: '', // 是否喜欢 
        };
        this.pullDownStart = this.pullDownStart.bind(this)
        this.pullDownMove = this.pullDownMove.bind(this)
        this.pullDownEnd = this.pullDownEnd.bind(this)
        this.selLike = this.selLike.bind(this)
       }
    async componentDidMount() {
         // let videoDetail
        let {movieId} = this.state;
    
        let nextData = this.props.likeListReducer.datas;
        let unLikeData=this.props.likeListReducer.undatas;
        if(nextData.length!==0){
            nextData.forEach((item,i)=>{
                if(item.id === movieId){
                   this.setState({
                       isLike: item.isLike
                   });
                }
           })
        }
        if(unLikeData.length!==0){
            unLikeData.forEach((item,i)=>{
                if(item.id === movieId){
                   this.setState({
                       isLike: item.isLike
                   });
                }
           })
        }
        await detailList(movieId).then(res => {
            console.log(res)
            this.setState({
                movieData: res,
            })
        })
        console.log('loaddone')
        setTimeout(() => {
            this.setState({
                loadDone: true
            })
        }, 500);
    }
       
    pullDownStart(e) {
        this.setState({
            pStart: e.touches[0].pageY,
            isStart: true
        })
    }
    pullDownMove(e) {
        let pScroll = Math.ceil((e.touches[0].pageY - this.state.pStart) * 0.6)
        this.setState({
            pScroll
        })
    }
    pullDownEnd(e) {
        // let scrollTop =  document.documentElement.scrollTop || document.body.scrollTop
        let pScroll = this.state.pScroll
        this.setState({
            pScroll: 0,
            isPullDown: true,
            isStart: false,
            loadDone: pScroll >= 50 ? false : true,
        })
        if (pScroll >= 50) {
            this.componentDidMount()
        }
    }
    
    // 点击看过或没有看过
    selLike(type) {
   // const {dispatch} = this.props;
       let _this=this; 
        console.log(type);
        _this.props.showToast({
            message: '标记为'+ (type === '1' ? '喜欢' : '不喜欢')
        })
        _this.setState({
            isLike: type
        });
        let likeData={
            id:_this.state.movieId,
            name:_this.state.movieData.title,
            img:_this.state.movieData.images.medium,
            average:_this.state.movieData.rating.average,
            stars:_this.state.movieData.rating.stars,
            isLike:type,
        }
        this.props.likeMovies(likeData)
        //dispatch(likeMovies({likeData}));
    }

    render() {
        let {loadDone,isStart,pScroll,movieData,isLike} = this.state;
        if (!movieData) return ''
        return (
            <div className="PulldownWrap"
                onTouchStart={this.pullDownStart}
                onTouchMove={this.pullDownMove}
                onTouchEnd={this.pullDownEnd}
                style = {
                    {
                        top: (pScroll > 0 ? pScroll : 0) + 'px'
                    }
                } >
                <div className="detail" >
                    <div className="homeTop">
                         <Link to="/home"> <i  className="iconfont icon-back"></i> </Link>
                    </div>   
                    <Arrow hidden={loadDone&&isStart} rotate={pScroll} /> 
                    <Loading loading={loadDone} />
                    <div className="header" >
                        <h1>{movieData.title}</h1>
                        <div className="header-top">
                            <div className="left">
                            <div className="starList" style={{'backgroundPositionY':-15*((Number(movieData.rating.stars))/20).toFixed(0)+'px'}}></div>
                              <p>评分：{movieData.rating.average}</p>
                              <div className="jie">
                               {movieData.durations[0]}分钟/{movieData.countries[0]}/
                               {movieData.pubdates[0]}
                               {
                                    movieData.casts.map(function (item,i) {
                                    return (
                                        <span key={i}>{item.name}/</span>
                                    )})
                                }
                              </div>
                            </div>
                            <div className="right">
                               <img src={movieData.images.medium} alt=""/>
                            </div>     
                        </div>
                        {/* 看过 */}
                        <LinkBtn isLike={isLike} selLike={this.selLike}  />
                        {/*所属评到  */}
                        <section id="channel_tags">
                            <h2>所属频道</h2>
                             <ul>
                             {
                                    movieData.tags.map(function (item,i) {
                                    return (
                                        <li className="channel_tag"  key={i}>{item} ></li>
                                    )})
                                }
                             </ul>        
                        </section>
                         {/*剧情简介  */}
                         <section className="subject-intro">
                            <h2>剧情简介</h2>
                            <div className="">{movieData.summary}</div>        
                        </section>
                         {/*影人  */}
                         <section id="celebrities">
                            <h2>影人</h2>
                             <ul className="row items">
                             {
                                    movieData.casts.map(function (item,i) {
                                    return (
                                        <li className="item__celebrity"  key={i}>
                                           <img src={item.avatars.small} />
                                            <p>{item.name}</p>
                                        </li>
                                    )})
                                }
                             </ul>        
                        </section>       
                    </div>    
                </div>    
            </div>    
        )
    }
  

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps.likeListReducer === null && nextProps.likeListReducer !== this.props.likeListReducer) {
            let nextData = nextProps.likeListReducer.datas;
            nextData.map((item,i)=>{
                 if(item.id === this.state.movieId){
                    this.setState({
                        isLike: item.isLike
                    });
                 }
            })
          
        }
    }

}
function mapStateToProps(store) {
    return {
        toast: store.toast,
        likeListReducer: store.likeListReducer
    }
}

function mapDispatchToProps(dispatch) {
    //console.log(dispatch)
    return {
        showToast: bindActionCreators(showToast, dispatch),
        likeMovies:bindActionCreators(likeMovies, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail)