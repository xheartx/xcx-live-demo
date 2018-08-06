var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    playing: true,
    autoplay: true,
    fullScreen: false,
    orientation: "vertical",
    objectFit: 'fillCrop',
    debug: false,
    muted: false,
    waitingImage: '/images/Resources/bg.png',
    playUrl: 'http://3891.liveplay.myqcloud.com/live/3891_user_e28c7220_a0f1.flv',
    commentList: [
      { name: '匆匆', comment: '测试直播测试直播测试直播测试直播测试直播测试直播测试直播测试直播间' },
      { name: '哈哈哈', comment: '不错不错。。。' },
      { name: '小小', comment: '赞一个！！' }
    ],
    btnsState: {}
  },
  changState(key) {
    if (this.btnsState[key]) {
      this.data.btnsState[key] = false
    } else {
      this.data.btnsState[key] = true
    }
    this.setData({
      btnsState: this.data.btnsState
    })
  },
  getBtnState(key) {
    return this.data.btnsState[key] ? (key + '_after') : key
  },
  onPlayEvent: function (e) {
    console.log(e.detail.code);
    if (e.detail.code == -1307) {
      wx.showToast({
        title: '推流多次失败',
      })
    }
  },
  formSubmit: function (e) {
    this.data.commentList.unshift({
      name: this.data.nickName,
      comment: e.detail.value.comment
    })
    this.setData({
      commentList: this.data.commentList
    })
  },
  onFullScreenClick: function() {
    if (!this.data.fullScreen) {
      this.data.videoContext.requestFullScreen();
    } else {
      this.data.videoContext.exitFullScreen();
    }
    this.setData({
      fullScreen: !this.data.fullScreen
    })
  },
  onMuteClick: function () {
    this.setData({
      muted: !this.data.muted
    })
  },
  onOrientationClick: function () {
    if (this.data.orientation == "vertical") {
      this.data.orientation = "horizontal";
      this.data.objectFit = 'contain'
    } else {
      this.data.orientation = "vertical";
      this.data.objectFit = 'fillCrop'
    }

    this.setData({
      orientation: this.data.orientation,
      objectFit: this.data.objectFit,
    })
  },
  createContext: function () {
    this.setData({
      videoContext: wx.createLivePlayerContext("livePlayer")
    })
  },
  stop: function () {
    this.setData({
      playing: true,
      playUrl: "http://3891.liveplay.myqcloud.com/live/3891_user_2fe7f003_d2f7.flv",
      orientation: "vertical",
      objectFit: "contain",
      muted: false,
      fullScreen: false,
      backgroundMuted: false,
      debug: false,
    })
    this.data.videoContext.stop();
    wx.hideLoading();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.getUserInfo(info => {
      this.setData({
        avatarUrl: info.avatarUrl,
        nickName: info.nickName,
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onLoad onReady");
    this.createContext();
    wx.setKeepScreenOn({
      keepScreenOn: true,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  onUnload: function () {
    console.log("onLoad onUnload");
    this.stop();
    wx.setKeepScreenOn({
      keepScreenOn: false,
    })
  }
})