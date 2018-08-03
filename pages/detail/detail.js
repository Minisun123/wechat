// pages/detail/detail.js
const WxParse = require('../../libs/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.error(options.url);
    const self = this;
    wx.request({
      url:'https://cz.droomo.top/juejin/post/' + options.url,
      success:function(data) {
        console.log(data.data)
        WxParse.wxParse('article', 'html', data.data, self, 5);
      }
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  }
})