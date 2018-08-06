App({
  // 获取用户信息
  getUserInfo: function (cb) {
    var that = this;

    if (this.globalData.userInfo) {
      typeof cb == 'function' && cb(this.globalData.userInfo)
    } else {
      // 先登录
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: (res) => {
              that.globalData.userInfo = res.userInfo;
              typeof cb == 'function' && cb(that.globalData.userInfo)
            },
            fail: (err) => {
              console.log(err)
              that.globalData.userInfo = that.globalData.defaultUserInfo;
              typeof cb == 'function' && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    // 用户信息
    userInfo: null,
    defaultUserInfo: {
      nickName: 'X.Heart',
      avatarUrl: '/images/avatar/1.png'
    }
  }
})