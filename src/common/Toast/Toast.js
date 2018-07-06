import './toast.css';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showToast } from "../../pages/store/action";
import {bindActionCreators} from 'redux'
class Toast extends Component {
    // constructor(props){
    //     super(props) 
    // }
    componentWillReceiveProps(){
        let toast = this.props.toast;        
        let isShow = toast.isShow === false ? toast.isShow : true
        if (!isShow) {
            console.log('show toast')
            setTimeout(() => {
                this.props.showToast({
                    isShow: false
                })
            }, 1500);
        }
    }
    render(){
        let toast = this.props.toast; 
        console.log(toast)
        let isShow = toast.isShow === false ? toast.isShow : true
        if (isShow) {
            return (
                <section className={'dialog'}>
                    <div className="dialog_wrap aniDialog">
                        <i className={'iconfont '+ (toast.icon === 'fail' ?  'icon-fail' : 'icon-success')}></i>
                        <p>{toast.message}</p>
                    </div>
                </section>
            )
        }else{
            return ''
        }
       
    }
}
function mapStateToProps(state) {
    return {
        toast: state.toast
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
)(Toast)