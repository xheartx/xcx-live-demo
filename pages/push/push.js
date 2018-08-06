var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showSet: false,
    playing: true,
    beauty: 6.3,
    whiteness: 3.0,
    mode: "HD",
    enableCamera: true,
    muted: false,
    frontCamera: true,
    autopush: true,
    fullScreen: false,
    debug: false,
    waitingImage: '/images/Resources/bg.png',
    pushUrl: "rtmp://3891.livepush.myqcloud.com/live/3891_user_e28c7220_a0f1?bizid=3891&txSecret=7ac061b9f9314179e330180418191c3b&txTime=5A701984",
    commentList: [
      { name: '匆匆', comment: '测试直播测试直播测试直播测试直播测试直播测试直播测试直播测试直播间'},
      { name: '哈哈哈', comment: '不错不错。。。' },
      { name: '小小', comment: '赞一个！！' }
    ]
  },
  onPush: function (e) {
    console.log(e.detail.code);
    if (e.detail.code == -1307) {
      this.stop();
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
  showSet: function() {
    this.setData({
      showSet: !this.data.showSet
    })
  },
  onLogClick: function() {
    this.setData({
      debug: !this.data.debug
    })
  },
  onMuteClick: function () {
    this.setData({
      muted: !this.data.muted
    })
  },
  onEnableCameraClick: function () {
    this.setData({
      enableCamera: !this.data.enableCamera
    })
    if (this.data.playing) {
      this.data.cameraContext.stop();
      setTimeout(() => {
        this.data.cameraContext.start();
      }, 500)
    } 
  },
  onModeClick: function() {
    if (this.data.mode == "SD") {
      this.data.mode = "HD";
    }
    else if (this.data.mode == "HD") {
      this.data.mode = "FHD";
    }
    else if (this.data.mode == "FHD") {
      this.data.mode = "SD";
    }
    wx.showToast({
      title: this.data.mode,
    })
    this.setData({
      mode: this.data.mode
    })
  },
  onBeautyClick: function () {
    if (this.data.beauty != 0) {
      this.data.beauty = 0;
      this.data.whiteness = 0;
    } else {
      this.data.beauty = 6.3;
      this.data.whiteness = 3.0;
    }

    this.setData({
      beauty: this.data.beauty,
      whiteness: this.data.whiteness
    })
  },
  onSwitchCameraClick: function () {
    this.data.frontCamera = !this.data.frontCamera;
    this.setData({
      frontCamera: this.data.frontCamera
    })
    this.data.cameraContext.switchCamera();
  },
  stop: function () {
    this.setData({
      playing: true,
      pushUrl: "rtmp://3891.livepush.myqcloud.com/live/3891_user_2fe7f003_d2f7?bizid=3891&txSecret=639f19af1f11b06ca8ee36ef68b26180&txTime=5A5B008D",
      mode: "HD",
      muted: false,
      enableCamera: true,
      orientation: "vertical",
      beauty: 0,
      whiteness: 0,
      backgroundMute: false,
      debug: false
    })
    this.data.cameraContext.stop();
  },
  togglePush() {
    if (this.data.playing) {
      this.data.cameraContext.pause();
      console.log("camera pause");
    } else {
      this.data.cameraContext.resume();
      console.log("camera resume");
    }
    this.setData({
      playing: !this.data.playing,
    })
  },
  createContext: function () {
    this.setData({
      cameraContext: wx.createLivePusherContext('pusher')
    })
    this.data.cameraContext.start();
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
    console.log('unload')
    this.stop()
    wx.setKeepScreenOn({
      keepScreenOn: false,
    })
  }
})