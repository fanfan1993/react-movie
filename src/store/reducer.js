import {combineReducers} from 'redux';
import * as Types from './type';

const initlikeList = {
    datas: [],
    undatas: [],
};


const toast = (state = {icon: '', message: '',isShow: false}, action) => {
    switch (action.type) {
        case 'SHOW_TOAST':
            return action.toast
        default:
            return state
    }
}

// const likeListReducer = (state =initlikeList, action) => {
//     switch (action.type) {
//         case 'SHOW_TOAST':
//             return action.toast
//         default:
//             return state
//     }
// }
export function likeListReducer(state = initlikeList, action) {
    switch (action.type) {
        case Types.Requestlist:
            if (action.data.isLike === '1') {
                // 看过
                if (initlikeList.datas.length === 0) {
                    initlikeList.datas.push(action.data)
                } else {
                    initlikeList.datas.forEach((item, i) => {
                        if (item.id !== action.data.id) {
                            initlikeList.datas.push(action.data)
                        } 
                    });
                }
            } else {
                // 没看过
                if (initlikeList.undatas.length === 0) {
                    initlikeList.undatas.push(action.data)
                } else {
                    initlikeList.undatas.forEach((item, i) => {
                        if (item.id !== action.data.id) {
                            initlikeList.undatas.push(action.data)
                        }
                    });
                }
            }
            return {
                ...state,
                // datas: initlikeList
            };
        default:
            return state;
    }

}
const reducer = combineReducers({
    toast,
    likeListReducer,
})
export default reducer