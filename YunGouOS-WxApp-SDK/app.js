//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //以上是小程序初始化生成的代码
  onShow(options) {
    //接受支付收银小程序返回的数据
    //参数示例：{"code": 0,data:{"order": "123456"},"msg": "支付成功"} 详情见文档 http://open.pay.yungouos.com/#/api/api/pay/wxpay/minPay
    let extraData=options.referrerInfo.extraData;
    console.log(extraData);
    if(extraData){
      //不管成功失败 先把支付结果赋值
      this.globalData.payStatus=extraData.result;
      if(extraData.result==false){
        wx.showToast({
          title: extraData.msg,//错误提示
          icon: 'none',
          duration: 3000
        });
        return;
      }
      //支付成功
      this.globalData.orderNo=extraData.orderNo;
    }
  },
  globalData: {
    userInfo: null,
    payStatus:null,//支付状态
    orderNo:null
  }
})