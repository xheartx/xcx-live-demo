var app = getApp()
Page({
  data: {
    nickName: 'X.Heart',
    avatarUrl: '/images/avatar/1.png'
  },
  onLoad: function () {
    app.getUserInfo(info => {
      this.setData({
        avatarUrl: info.avatarUrl,
        nickName: info.nickName,
      })
    })
  },
  goPush: function (event) {
    wx.navigateTo({
      url: "/pages/push/push"
    });
  },
  goLive: function (event) {
    wx.navigateTo({
      url: "/pages/liveroom/liveroom"
    });
  },
  /**
 * 用户点击右上角分享
 */
  onShareAppMessage: function () {
    console.log("onLoad onShareAppMessage");
    return {
      title: '直播小Demo',
      path: '/pages/welcome/welcome',
      imageUrl: '../../images/Resources/share.png'
    }
  }
})