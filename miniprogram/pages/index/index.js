// index.js
// 获取应用实例
const app = getApp()
const url = require('../../utils/url');
const urlList = require('../../utils/url');

Page({
  data: {
    isLocation:0,
    // 定义data变量
    userInfo:[],
    isLogin: true,
    intro:"",
    sessionId: "",
    encryptedData:"",
    iv:"",
    user:"",
    myInfo: [],
    rank:[],
    rankL:[]
  },
  
  // bindViewTap() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },  

  // 页面加载时触发
 
  onLoad() {
   
    // 判断storage里有没有openid
    if(wx.getStorageSync('openId') == ""){
      // 如果没有openid，显示登录按钮，隐藏自己的卡片
      this.setData({
        isLogin: false
      })
    }else{
      // 如果有openid，获取openid
      const openId = wx.getStorageSync('openId')
      
      // 发起请求，获取用户信息
      this.getUserInfo(openId)
      this.setData({
        isLogin: true
      })
    }

    // 获取排行榜数据
    wx.request({
      url: urlList.urlList.leaderBoard,
      data:{
        first: 0,
        last: 5,
      },
      success: res=>{
        this.setData({
          rank: res.data
        })
        console.log(res.data)
        const rank = this.data.rank
        for(var i = 0; i < rank.length; i ++){
            rank[i].rankNum = i + 1
        }
        var temp = [rank.length - 3];
        for(var i = 3; i < rank.length; i ++){
          temp[i - 3] = rank[i];
        }
        this.setData({
          rankL: temp
        })
        console.log(this.data.rankL)


        this.setData({
          rank: rank
        })
      },
    })
    
    // 获取intro文字
    wx.request({
      url: urlList.urlList.intro,
      success: res=>{
        this.setData({
          intro: res.data
        })
      }
    })
  },
  getLocation(){
    if(this.data.isLocation == 0){
      setInterval(function(){
        wx.getLocation({
          type: "wgs84",
          success (res) {
              console.log(res)
          }
      })
      },1000)
      this.setData({
        isLocation: 1
      })
    }
    
  },
  getUserInfo(openId){
    wx.request({
      method: "POST",
      url: urlList.urlList.userInfo + "?openId=" + openId,
      success: res=>{
        if(res.data.username == "微信用户"){
          wx.navigateTo({
            url: '/pages/userDetails/userDetails',
          })
        }
        // console.log(res.data)
        this.setData({
          myInfo: res.data
        })
      }
    })
  },
  onShow(){
    this.onLoad()
  },
  // 登录函数
  loginFunc(){
    wx.getUserProfile({
      desc: '必须授权才能使用',
      success:res=>{
        let user=res.userInfo
        
        this.setData({
          user:user,
          encryptedData: res.encryptedData,
          iv: res.iv
        })
        var encryptedData=res.encryptedData;
        var iv=res.iv;
        var that = this
        wx.login({
          success:(res)=>{
            wx.showLoading({
              title: '正在登录',
            })
            console.log("code: " + res.code)
            if(res.code){
              // 发起登录请求
              wx.request({
                url: urlList.urlList.login,
                method:'POST',
                header:{
                  'content-type':'application/x-www-form-urlencoded',
                },
                data: {
                  code: res.code,
                  encryptedData:encryptedData,
                  iv:iv,
                },
                success: (res) => {
                  wx.setStorageSync('token', res.data.data);
                 
                  wx.request({
                    url: urlList.urlList.wxlogin,
                    method:'POST',
                    header:{
                      'content-type':'application/x-www-form-urlencoded',
                    },
                    data: {
                      sessionId: res.data,
                      encryptedData: this.data.encryptedData,
                      iv: this.data.iv,
                    },
                    success(res){
                      // 将获取到的openid存储到本地缓存
                      wx.setStorageSync('openId', res.data)
                      setInterval(() => {
                        wx.hideLoading()
                      }, 500)
                      // 重新加载页面数据
                      that.onLoad()
                    }
                  })
                }
              })
            }
          }
        })
      },
      fall:res=>{
        console.log('失败',res)
      }
    })
  }
})
