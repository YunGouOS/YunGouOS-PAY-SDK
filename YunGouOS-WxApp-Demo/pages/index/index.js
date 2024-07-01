
Page({
  data: {

  },

  toWxPay() {
    let body = "小程序支付原生演示";
    let money = "0.01";

    wx.getStorage({
      key: "openid",
      success: (resp) => {
        let openId = resp.data;
        wx.request({
          url: 'http://127.0.0.1:8080/api/wxpay/minAppPay',
          data: {
            body: body,
            money: money,
            openId: openId
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          success: (res) => {
            let data = res.data.data;
            console.log(data);

            wx.requestPayment({
              timeStamp: data.timeStamp,
              nonceStr: data.nonceStr,
              package: data.package,
              signType: data.signType,
              paySign: data.paySign,
              success(res) {
                console.log(res);
                if (res.errMsg == 'requestPayment:ok') {
                  wx.showToast({
                    title: '支付成功',
                    icon: 'success',
                    duration: 2000
                  })
                }

              },
              fail(res) { }
            })
          }
        })
      }
    })
  }

})
