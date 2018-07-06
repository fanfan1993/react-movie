import React, {Component} from 'react'
import './home.css'
import { initHome,comingList,topList } from '../../http/index'
import Footer from '../../common/Footer/Footer'
import {List} from './components/List'
import Arrow from '../../common/Arrow/arrow'
import Loading from '../../common/Loading/loading'
import Search from './components/Search'
class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            movieList: [],
            comingLists: [],
            topLists: [],
            loadDone:false,
            pStart:0,
            pScroll:0,
            isPullDown:false,
            isStart:false,
        };
        this.pullDownStart = this.pullDownStart.bind(this)
        this.pullDownMove = this.pullDownMove.bind(this)
        this.pullDownEnd = this.pullDownEnd.bind(this)
    }
    async componentDidMount() {
        //console.log('allmovieList', this.props.allmovieList)
        if (this.state.isPullDown||Array.isArray(this.state.movieList)) {
            //多个请求
             await Promise.all[
                await  initHome().then(res=>{
                    this.setState({
                        movieList: res.subjects,
                    })
                    //this.props.saveAllVideo(res.data)
                    //console.log(this.props.allmovieList)
                }),
                await  comingList().then(res=>{
                    this.setState({
                        comingLists: res.subjects,
                    })
                }),
                await topList().then(res=>{
                    this.setState({
                        topLists: res.subjects,
                    })
                })
             ]
            setTimeout(() => {
                this.setState({
                    loadDone: true
                })
            }, 500);
        }else{
            this.setState({
                //movieList: this.props.allmovieList,
                loadDone: true                
            })
        } 
    }
    componentWillUnmount() {
    }
    pullDownStart(e){
        console.log(e.touches[0].pageY)
        this.setState({
            pStart: e.touches[0].pageY,
            isStart:true
        })
    }
    pullDownMove(e){
        e.preventDefault();
        let pScroll = Math.ceil((e.touches[0].pageY - this.state.pStart) * 0.6)
        console.log(pScroll, e.touches[0].pageY)
        this.setState({
            pScroll,
        })
    }
    pullDownEnd(e){
        console.log('end', e)
        let pScroll = this.state.pScroll
        this.setState({
            pScroll: 0,
            isPullDown: true,
            isStart: false,
            loadDone: pScroll >= 50 ? false : true,
        })
        if (pScroll >= 50 ){
            this.componentDidMount()
        }
    }
    render() {
        let {pScroll,loadDone,isStart,movieList,comingLists,topLists} = this.state;
        console.log(isStart, 'isStart')
        return (
            <div className="home">
               <div className="homeTop" id="top">
                  <a href="https://github.com/fanfan1993" target="_blank"> <i  className="iconfont icon-github"></i> </a>
               </div>    
              
               <Footer path="home" />
               <div className="wrap">
                    <div className="pulldownWrap"
                        onTouchStart={this.pullDownStart}
                        onTouchMove={this.pullDownMove}
                        onTouchEnd={this.pullDownEnd}   
                        style = {
                            {
                                top: (pScroll > 0 ? pScroll : 0) + 'px'
                            }
                        } >
                        <Arrow hidden={loadDone&&isStart} rotate={pScroll} /> 
                        <Loading loading={loadDone} />
                        <Search />
                        <List movieList={movieList}  name="正在上映" link="/in" />
                        <List movieList={comingLists}  name="即将上映" link="/in" />
                        <List movieList={topLists}  name="TOP" link="/in" />
                    </div>  
                </div>   
            </div>
        )
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         showToast: bindActionCreators(showToast, dispatch),
//     }
// }

// export default connect(
//     mapDispatchToProps
// )(Home)

export default Home
