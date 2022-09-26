import wxPayUtil from "../../wxpay/wxPayUtil";

//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    openId:null
  },
  onLoad: function () {
    
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
    //授权
    if (app.globalData.oauthData != null && app.globalData.oauthData != undefined) {
      let dataInfo = app.globalData.oauthData;
      if (dataInfo.openId != null && dataInfo.openId != undefined) {
        this.setData({
          openId: dataInfo.openId
        })
        wx.showToast({
          title: '授权成功',
          icon: 'success',
          duration: 2000
        })
      }
    }
  },

  //************以下展示我们的支付能力*************** */

  //事件处理函数
  toPay: function() {

    //订单号
    let out_trade_no=wxPayUtil.getOrderNo("WA");
    //支付金额 单位：元
    let total_fee='0.10';
    //商品简称
    let body='小程序支付接口演示';
    //回调地址
    let notify_url='';

    let attach="我是附加参数，我会在被原路传送到回调地址";

    let title='YunGouOS'//收银台标题显示名称 xxx-收银台

    wxPayUtil.toPay(out_trade_no,total_fee,body,notify_url,attach,title,(response)=>{
      console.log(response);
    });
    
  },

  /**
   * 小程序授权方式获取openid
   * 文档地址：https://open.pay.yungouos.com/#/api/api/wx/oauth
   */
  toOauth: function () {
    //附加参数，授权后原路返回，可随便写
    let params = {
      type:"oauth"
    };
    //跳转到支付收银小程序的参数
    let data = {
      merchant_id: '商户号',
    }

    let sign = wxPayUtil.wxPaySign(data, "商户密钥");
    data.params = params;
    data.sign = sign;

    wx.openEmbeddedMiniProgram({
      appId: 'wxd9634afb01b983c0',//支付收银小程序的appid 固定值 不可修改
      path: '/pages/oauth/oauth',//授权页面 固定值 不可修改
      extraData: data,//携带的参数 参考API文档
      success(res) {
        console.log(res);
      }, fail(res) {
        console.log(res);
      }
    });
  }



})
