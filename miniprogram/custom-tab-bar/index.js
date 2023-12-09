// pages/custom-tab-bar/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLog: false,
    imageUrl: "../images/addLog.svg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  }, 
  onShareAppMessage() {

  },
  switchTab(e) {
    if(this.data.isLog == false){
      this.setData({
        isLog: !this.data.isLog,
      })

      const url = e.currentTarget.dataset.url;
      wx.switchTab({ url });
    
    }else{
      this.setData({
        isLog: !this.data.isLog,

      })
      wx.switchTab({
        url: '/pages/index/index',

      })
    
    }
    
   
  },
  centerAction() {
    // 这里可以实现中央按钮的特定功能，例如打开一个模态框等。
    wx.showToast({
      title: 'Center tapped!',
      icon: 'none'
    });
  }
})