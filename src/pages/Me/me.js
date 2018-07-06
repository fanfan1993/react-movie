import React, {Component} from "react";
import './me.css'
//import { detailList} from '../../http/index'
import Loading from '../../common/Loading/loading'
import { connect } from 'react-redux'
import { showToast } from "../../store/action";
import {bindActionCreators} from 'redux'
import {List} from './components/List'
import Arrow from '../../common/Arrow/arrow'
import Footer from '../../common/Footer/Footer'

class Me extends Component{
    constructor(props){
        super(props)
        this.state = {
           // movieData:null,
            movieList: [],
            unlikeList:[],
            loadDone:false,
            pStart: 0,
            pScroll: 0,
            isPullDown: false,
            isStart: false
        };
        this.pullDownStart = this.pullDownStart.bind(this)
        this.pullDownMove = this.pullDownMove.bind(this)
        this.pullDownEnd = this.pullDownEnd.bind(this)
       }
    async componentDidMount() {
        
        let nextData = this.props.likeListReducer.datas;
        let unlikeData = this.props.likeListReducer.undatas;
        this.setState({
            movieList: nextData,
            unlikeList:unlikeData
        });
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
    
    render() {
        let {loadDone,isStart,pScroll,movieList,unlikeList} = this.state;
        //if (!movieData) return ''
        return (
             <div className="user">
                 <Footer path="me" />
                <div className="PulldownWrap"
                    onTouchStart={this.pullDownStart}
                    onTouchMove={this.pullDownMove}
                    onTouchEnd={this.pullDownEnd}
                    style = {
                        {
                            top: (pScroll > 0 ? pScroll : 0) + 'px'
                        }
                    } >
                    <div >
                        <Arrow hidden={loadDone&&isStart} rotate={pScroll} /> 
                        <Loading loading={loadDone} />
                        <div className="header" >
                            <div className="avator_border">
                               <img  alt=""  src="http://vue.wclimb.site/images//avator/2ph2tcvzf6w1524303798928.png" />
                            </div>
                            <h1>小粉丝</h1>
                        </div>
                        {/* 看过 */} 
                        <List movieList={movieList}  name="看过" link="/in" />
                        <List movieList={unlikeList}  name="没看过" link="/in" />
                    </div>    
                </div>
            </div>    
        )
    }
  

}
function mapStateToProps(store) {
    return {
        toast: store.toast,
        likeListReducer: store.likeListReducer
    }
}

function mapDispatchToProps(dispatch) {
    return {
        showToast: bindActionCreators(showToast, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Me)