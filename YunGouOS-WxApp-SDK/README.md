# YunGouOS 小程序支付
微信官方合作伙伴，直接微信开户，非聚合支付、非二次清算。资金微信直连结算到自己银行卡

# 如何使用

在官网提交资料，由微信审核，审核通过后下发商户号，对接使用。

# 在线体验

![https://yungouos.oss-cn-shanghai.aliyuncs.com/YunGouOS/merchant/mindemo/minapp.jpg](https://yungouos.oss-cn-shanghai.aliyuncs.com/YunGouOS/merchant/mindemo/minapp.jpg)


# 快速开始

第一步：下载小程序支付SDK

第二步：在 [http://merchant.yungouos.com](http://merchant.yungouos.com "http://merchant.yungouos.com") 微信支付->商户管理->开通小程序支付权限（如果您还未申请，通过 申请支付菜单在线申请）

第三步：修改 project.config.json 文件中的appid改成您自己的小程序

第四步：修改 /wxpay/config.js 中的微信支付商户号与支付密钥

第五步：预览或真机调试体验


# 已有项目如何快速集成？

第一步：在你的小程序app.json文件中 添加 “支付收银” 小程序的appid为：wxd9634afb01b983c0

	"embeddedAppIdList": [
        "wxd9634afb01b983c0"
     ]

第二步：复制SDK中的 wxpay文件夹到您项目的根目录，与pages目录同级，修改config.js中的微信支付参数

第三步：在您需要支付的方法中增加：

	wxPayUtil.toPay(out_trade_no,total_fee,body,notify_url,attach,title,(response)=>{
	      console.log(response);
		  //您的业务	
    });
		
这样您的小程序就已经可以打开支付，进行支付了。但是为了进一步优化体验我们还需要在编写支付结束后返回的一些事情处理。请继续往下看

第四步：在您的app.js文件中的onShow方法下 增加如下代码（注意此处需要在onShow方法中增加参数，修改后为 onShow(options) ）
	
   
    if (options == null || options == '' || options.referrerInfo == null || options.referrerInfo=='') { 
      return;
    }

    let extraData=options.referrerInfo.extraData;
    if(extraData){
      //不管成功失败 先把支付结果赋值
      this.globalData.payStatus=extraData.code==0?true:false;
      if(extraData.code!=0){
        wx.showToast({
          title: extraData.msg,//错误提示
          icon: 'none',
          duration: 3000
        });
        return;
      }
      //支付成功
      this.globalData.orderNo=extraData.data.orderNo;
    }

需要在 globalData里面增加2个属性，当然这个不是固定的您可以按需处理。主要原理就是把支付结果存储到这里面，然后在页面上通过app.globalData来获取数据继续使用 代码如下
	
	globalData: {
		payStatus:null,//支付状态
		orderNo:null//订单号
	}


第五步：我们可能需要在支付页面在做一些事情，比如支付成功进行页面跳转。在您支付页面的 onShow 方法中增加如下代码

	//支付完成返回，开始处理数据
     if(app.globalData.payStatus!=null&&app.globalData.payStatus!=undefined){
      let orderno=app.globalData.orderNo;
      console.log('接收到返回支付结果',app.globalData.payStatus);
      console.log('订单号',orderno);
      //处理您自己的业务
    }


