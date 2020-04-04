import wxPayUtil from "../../wxpay/wxPayUtil";
import config from "../../wxpay/config";

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
     //获取用户信息的 跟支付无关
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow:function(){
     //支付完成返回，开始处理数据
     if(app.globalData.payStatus!=null&&app.globalData.payStatus!=undefined){
      let orderno=app.globalData.orderNo;
      console.log('接收到返回支付结果',app.globalData.payStatus);
      console.log('订单号',orderno);
      //处理您自己的业务

      if(app.globalData.payStatus){
        wx.showToast({
          title: '支付成功',
          icon: 'success',
          duration: 2000
        })
      }
      
    }
  },
  getUserInfo: function(e) {
    //获取用户信息的 跟支付无关
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  //上述是小程序创建默认代码

  //************以下展示我们的支付能力*************** */

  //事件处理函数
  toPay: function() {

    //订单号
    let out_trade_no=wxPayUtil.getOrderNo("WA");
    //支付金额 单位：元
    let total_fee='0.10';
    //支付商户号，登录YunGouOS.com 申请 支持资质个人申请
    let mch_id=config.mch_id;
    //商品简称
    let body='小程序支付接口演示';
    //回调地址
    let notify_url='';

    let attach="我是附加参数，我会在被原路传送到回调地址";

    let title='YunGouOS'//收银台标题显示名称 xxx-收银台

    wxPayUtil.toPay(out_trade_no,total_fee,body,notify_url,attach,title,(response)=>{
      console.log(response);
    });
    
  }




})
