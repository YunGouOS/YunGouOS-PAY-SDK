// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          url: '你自己的登录接口',
          data: "code=" + res.code,
          method: 'post',
          success(res) {
            let data = res.data.data;
            console.log(data.openid);
            wx.setStorage({
              key: "openid",
              data: data.openid
            })
          }
        })
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
