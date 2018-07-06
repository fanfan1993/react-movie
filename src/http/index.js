import axios from 'axios'
//export const baseUrl = 'http://vue.wclimb.site';
let baseUrl = 'https://douban.uieee.com';

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3000';
} else {
   // baseUrl = 'http://localhost:3000';
}
// export const baseUrl = 'http://localhost:3000';
let $axios = axios.create({
    baseURL: baseUrl + '/v2/movie',
    timeout: 30000,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    }
});

function getCookie(name) {
    let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    arr = document.cookie.match(reg)
    if (arr)
        return unescape(arr[2]);
    else
        return null;
}

function $fetch(method, url, data) {
    return new Promise((reslove, reject) => {
        $axios({
            method,
            url,
            data: data,
            headers: {
                token: getCookie('token')
            }
        }).then(res => {
            let body = res.data
            if (res.status === 200 || res.status === 201) {
                reslove(body)
            } else {
                reject(body)
            }
        }).catch(err => {
                reject(err)
        })

    })
}

// 首页初始化数据
// 正在上映
export const initHome = () => $fetch('get', 'in_theaters');

// 快要上映
export const comingList = () => $fetch('get', 'coming_soon');

// TOP10
export const topList = () => $fetch('get', 'top250');

// 详情页数据
export const detailList = (id) => $fetch('get', "subject/"+id,{id});

// 搜索
export const search = (val) => $fetch('post', 'search?q='+val, {
    val
})