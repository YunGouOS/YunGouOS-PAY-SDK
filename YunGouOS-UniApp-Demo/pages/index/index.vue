<template>
	<view class="content">
		<view class="btn-view">
			<button type="primary" @click="nativePayAsync">微信扫码支付(同步)</button>
		</view>
		<view class="btn-view">
			<button type="primary" @click="nativePay">微信扫码支付(异步)</button>
		</view>

		<view class="btn-view">
			<button type="primary" @click="cashierPay">微信收银台支付（微信内）</button>
		</view>
		
		<view class="btn-view">
			<button type="primary" @click="jsPay">微信公众号支付（微信内）</button>
		</view>

		<view class="btn-view">
			<button type="primary" @click="minAppPay">微信小程序支付（小程序内）</button>
		</view>

		<view class="btn-view">
			<button type="primary" @click="wapPay">微信H5支付（微信外浏览器）</button>
		</view>

		<view class="btn-view">
			<button type="primary" @click="appPay">微信APP支付(原生模式)</button>
		</view>

		<view class="btn-view">
			<button type="primary" @click="appPayByWap">微信APP支付(H5模式)</button>
		</view>
		
		<view class="btn-view">
			<button type="primary" @click="appPayAliPay">支付宝APP支付</button>
		</view>


		<view class="btn-view">
			<image :src="payCode" mode="aspectFit"></image>
		</view>
	</view>
</template>



<script>
	import {
		WxPay,
		AliPay,
		WxLogin
	} from 'yungouos-pay-uniapp-sdk'

	let time=null;

	export default {
		data() {
			return {
				title: 'Hello',
				payCode: '',
				orderNo:null,
			}
		},
		onLoad() {},
		onShow() {
			//页面显示时候做的事情
			let globalData = getApp().globalData;
			console.log(globalData);
			if (globalData == null || globalData == '' || globalData == undefined) {
				return;
			}

			let payStatus = globalData.payStatus;
			let orderNo = globalData.orderNo;


			if (payStatus) {
				uni.showToast({
					title: '支付成功',
					icon: "success"
				});
			}

			//严谨一点 拿着订单号，查询自己系统内订单状态，根据自己服务端的状态判断后续页面交互

		},
		methods: {
			/**
			 * 微信扫码支付同步
			 */
			nativePayAsync: async function() {
				let out_trade_no = new Date().getTime();
				let total_fee = "0.01";
				let mch_id = "1529637931";
				let body = "扫码支付测试";
				let type = "2";
				let attach = null;
				let notify_url = null;
				let auto = null;
				let auto_node = null;
				let config_no = null;
				let payKey = "499F61DB734C4BF39792A098C44FA80A";
				let result = await WxPay.nativePayAsync(out_trade_no, total_fee, mch_id, body, type, attach,
					notify_url, auto, auto_node, config_no, null, payKey);
				this.payCode = result;
			},
			/**
			 * 微信扫码支付异步
			 */
			nativePay: function() {
				let out_trade_no = new Date().getTime();
				let total_fee = "0.01";
				let mch_id = "1529637931";
				let body = "扫码支付测试";
				let type = "2";
				let attach = null;
				let notify_url = null;
				let auto = null;
				let auto_node = null;
				let config_no = null;
				let payKey = "499F61DB734C4BF39792A098C44FA80A";
				WxPay.nativePay(out_trade_no, total_fee, mch_id, body, type, attach, notify_url, auto, auto_node,
					config_no, null, payKey).then((response) => {
					//接口返回结果
					console.log(response);
					if (response == null || response.code == 1) {
						uni.showToast({
							title: response.msg,
							duration: 2000
						});
						return;
					}
					this.payCode = response.data;
				});
			},
			/**
			 * 微信H5支付 同步
			 */
			wapPay: async function() {
				let out_trade_no = new Date().getTime();
				let total_fee = "0.01";
				let mch_id = "1602333609";
				let body = "扫码支付测试";
				let attach = null;
				let notify_url = null;
				let return_url = null;
				let auto = null;
				let auto_node = null;
				let config_no = null;
				let payKey = "D29ADE73DC084C5EB434302014687FAF";
				let result = await WxPay.wapPayAsync(out_trade_no, total_fee, mch_id, body, attach, notify_url,
					return_url, auto, auto_node, config_no, null, payKey);

				var referLink = document.createElement('a');
				referLink.href = "http://www.yungouos.com";
				document.body.appendChild(referLink);
				referLink.click();
			},
			/**
			 * 小程序支付
			 */
			minAppPay: function() {
				let out_trade_no = new Date().getTime();
				let total_fee = "0.01";
				let mch_id = "1529637931";
				let body = "小程序支付演示";
				let attach = null;
				let title = "海底捞";
				let notify_url = "http://api.merchant.yungouos.com/api/system/demo/callback";
				let auto = null;
				let auto_node = null;
				let config_no = null;
				let biz_params = null;
				let payKey = "499F61DB734C4BF39792A098C44FA80A";

				WxPay.minAppPay(out_trade_no, total_fee, mch_id, body, attach, title, notify_url, auto, auto_node,
					config_no, biz_params, payKey);


				// let params=WxPay.minAppPayParams(out_trade_no, total_fee, mch_id, body, attach, title, notify_url, auto, auto_node, config_no, biz_params, payKey);

				// uni.openEmbeddedMiniProgram({
				//         appId: 'wxd9634afb01b983c0',//支付收银小程序的appid 固定值 不可修改
				//         path: '/pages/pay/pay',//支付页面 固定值 不可修改
				//         extraData: params,//携带的参数 参考API文档
				//         success(res) {
				//             console.log("小程序拉起成功");

				// 			//最自己的业务
				//         }
				// })

				// console.log(params);
			},
			/**
			 * APP支付 通过H5接口拉起支付方式
			 */
			appPayByWap: async function() {

				//调用自己后端API接口保存订单并且订单是未支付

				let body = "APP支付模式1演示";
				let total_fee = "0.01";

				uni.request({
					url: 'http://yungouos.wicp.net/api/order/add',
					method:"POST",
					data:"body="+body+"&money="+total_fee,
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success:async (res) => {
						let order=res.data.data;
						let out_trade_no = order.orderNo;
						this.orderNo=out_trade_no;
						
						let mch_id = "1602333609";
						let attach = null;
						let notify_url = "http://yungouos.wicp.net/api/callback/notify";
						let return_url = "http://www.yungouos.com";
						let auto = null;
						let auto_node = null;
						let config_no = null;
						let biz_params = null;
						let payKey = "D29ADE73DC084C5EB434302014687FAF";
						
						let result = await WxPay.wapPayAsync(out_trade_no, total_fee, mch_id, body, attach, notify_url,return_url, auto, auto_node, config_no, biz_params, payKey);
						
						let wv = plus.webview.create("", "pay-webview", {
							plusrequire: "none",
							'uni-app': 'none',
						});
						wv.loadURL(result, {Referer: 'http://www.yungouos.com'});
						var currentWebview = this.$scope.$getAppWebview();
						currentWebview.append(wv);
						wv.hide();
						//轮询查询自己系统的订单状态
						time=setInterval(() => {
							//调用查询订单
							this.getOrderInfo();
						}, 1000)

					}
				});

			},
			/**
			 * 微信原生APP支付
			 */
			appPay: async function() {
				let app_id="wx465856913462378a";
				let out_trade_no = new Date().getTime();
				let total_fee="0.01";
				let mch_id = "1602333609";
				let body="微信APP支付原生方式演示";
				let attach = null;
				let notify_url = "http://yungouos.wicp.net/api/callback/notify";
				let auto = null;
				let auto_node = null;
				let config_no = null;
				let biz_params = null;
				let payKey = "D29ADE73DC084C5EB434302014687FAF";
				
				let result = await WxPay.appPayAsync(app_id, out_trade_no, total_fee, mch_id, body, attach, notify_url, auto, auto_node, config_no,biz_params, payKey);
				
				if(result==null||result==''||result==undefined){
				    console.log("支付失败");
				    return;
				}
				
				let orderInfo=JSON.parse(result);
				
				let appPayParam={};
				
				appPayParam.orderInfo=orderInfo;
				
				appPayParam.provider="wxpay";
				//构建支付成功方法
				appPayParam.success = (response) => {
				    if (response.errMsg == 'requestPayment:ok') {
				        //支付成功
				        console.log("APP支付成功");
						//调用查询订单
						uni.showToast({
							title:"支付成功",
							icon:'success'
						});
				    }
				}
				//构建支付失败方法
				appPayParam.fail = (response) => {
				    if (response.errMsg == 'requestPayment:fail cancel') {
				        //取消支付
				        console.log("取消支付");
						uni.showToast({
							title:"取消支付"
						});
				    }
				}
				
				//拉起微信APP支付
				uni.requestPayment(appPayParam);
			},
			/**
			 * 支付宝APP原生支付
			 */
			appPayAliPay:async function(){
				
				let out_trade_no = new Date().getTime();
				let total_fee="0.01";
				let mch_id = "2088110007357703";
				let body="支付宝原生APP支付演示";
				let attach = null;
				let notify_url = "http://yungouos.wicp.net/api/callback/notify";
				let hbfq_num=null;
				let hbfq_percent=null;
				let payKey = "A01D612DA7F94211B55B594C36B825E7";
				let result = await AliPay.appPayAsync(out_trade_no, total_fee, mch_id, body, attach, notify_url,hbfq_num,hbfq_percent, payKey);
				
				let appPayParam={};
				
				appPayParam.orderInfo=result;
				
				appPayParam.provider="alipay";
				//构建支付成功方法
				appPayParam.success = (response) => {
				    if (response.errMsg == 'requestPayment:ok') {
				        //支付成功
				        console.log("APP支付成功");
						//调用查询订单
						uni.showToast({
							title:"支付成功",
							icon:'success'
						});
				    }
				}
				//构建支付失败方法
				appPayParam.fail = (response) => {
				    if (response.errMsg == 'requestPayment:fail cancel') {
				        //取消支付
				        console.log("取消支付");
						uni.showToast({
							title:"取消支付"
						});
				    }
				}
				//拉起支付宝APP支付
				uni.requestPayment(appPayParam);
			},
			/**
			 * 查询自己系统订单状态
			 */
			getOrderInfo:function(){
				let orderNo=this.orderNo;
				uni.request({
					url: 'http://yungouos.wicp.net/api/order/checkOrderStatus',
					method:"POST",
					data:"orderNo="+orderNo,
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						let result=res.data;
						console.log("订单支付结果:"+orderNo,result.data)
						if(result.data){
							if(time!=null){
								console.log("定时器已清除")
								clearInterval(time);
							}
							uni.showToast({
								title:"支付成功",
								icon:'success'
							});
						}
					}
				});
			},
			/**
			 * 微信收银台支付
			 */
			cashierPay:async function(){
				let out_trade_no = new Date().getTime();
				let total_fee = "0.01";
				let mch_id = "1529637931";
				let body = "收银台支付接口演示";
				let attach = null;
				let notify_url = "http://api.merchant.yungouos.com/api/system/demo/callback";
				let return_url="http://localhost.yungouos.com:8080/#/pages/index/index";
				let auto = null;
				let auto_node = null;
				let config_no = null;
				let biz_params = null;
				let payKey = "499F61DB734C4BF39792A098C44FA80A";
				let result =await WxPay.cashierPayAsync(out_trade_no, total_fee, mch_id, body, attach, notify_url, return_url, auto, auto_node, config_no,biz_params, payKey);
				console.log(result);
				window.location.href=result;
				
				//支付结果
				//http://localhost.yungouos.com:8080/#/pages/index/index?code=1&orderNo=Y18464496296897&outTradeNo=1622458002985&payNo=4200001025202105313966476948&money=0.01&mchId=1529637931&time=2021-05-31%2018%3A46%3A48&attach=null&openId=o-_-itxeWVTRnl-iGT_JJ-t3kpxU&sign=E63B31BB8FA27830ACC96C5D982498A3
			},
			/**
			 * 公众号支付
			 */
			jsPay:async function(){
				console.log("测试");
				let mch_id = "1529637931";
				//授权结束后重定向地址
				let callback_url="http://localhost.yungouos.com:8080/#/pages/oauth/oauth";
				let type=null;
				let params={
					userId:"12345"
				}
				let key="499F61DB734C4BF39792A098C44FA80A";
				let result =await WxLogin.getOauthUrlAsync(mch_id, callback_url, type, params, key);
				console.log(result);
				window.location.href=result;
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.btn-view {
		margin-top: 20px;
	}
</style>
