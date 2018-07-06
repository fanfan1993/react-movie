import * as Types from './type';

export const showToast = (toast) => ({
    type: 'SHOW_TOAST',
    toast
})

export function likeMovies(likeData) {
    return (dispatch) => {
        dispatch({'type': Types.Requestlist, data: likeData,});
    }
}
// export const likeMovies = (likeData) => ({
//     type: Types.Requestlist,
//     likeData
// })

