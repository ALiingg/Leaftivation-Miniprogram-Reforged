let basePath = 'https://leaftivation.site';
// let basePath = 'http://westcloud.site:8081';
// let basePath = 'http://127.0.0.1:8081'

let urlList = {
    intro: basePath + '/introduction',
    login: basePath + '/login',
    wxlogin: basePath + '/wxlogin',
    leaderBoard: basePath + '/leaderboard',
    Asearch: basePath + '/award/search',
    Aselect: basePath + '/award/select',
    Aget: basePath + '/award/get',
    addCart: basePath + '/cart/add',
    getCart: basePath + '/cart/getCart',
    total: basePath + '/cart/totalPrice',
    check: basePath + '/cart/purchase',
    userInfo: basePath + '/userInfo',
    deleteItem: basePath + '/cart/delete/item',
    changeItem: basePath + '/cart/change/item',
    uplPic: basePath + '/upload/picture',
    uplLog: basePath + '/upload/log',
    getLog: basePath + '/upload/get/all/log',
    alterUserName: basePath + '/login/alter/username',
    alterAvatar: basePath + '/login/upload/avatar'



    
}
module.exports = {
  urlList: urlList
}