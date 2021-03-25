<template>
	<view class="content">
			<view class="btn-view">
				<button type="primary" @click="nativePayAsync">微信扫码支付(同步)</button>
			</view>
			<view class="btn-view">
				<button type="primary" @click="nativePay">微信扫码支付(异步)</button>
			</view>
			
			<view class="btn-view">
				<button type="primary" @click="jsPay">微信公众号支付（JSAPI微信内）</button>
			</view>
			
			<view class="btn-view">
				<button type="primary" @click="minAppPay">微信小程序支付（小程序内）</button>
			</view>
			
			<view class="btn-view">
				<button type="primary" @click="wapPay">微信H5支付（微信外浏览器）</button>
			</view>
			
			<view class="btn-view">
				<button type="primary" @click="appPay">微信APP支付</button>
			</view>
			
			
			<view class="btn-view">
				<image :src="payCode" mode="aspectFit"></image>
			</view>
	</view>
</template>



<script>
	import {WxPay} from 'yungouos-pay-uniapp-sdk'
	
	export default {
		data() {
			return {
				title: 'Hello',
				payCode: '',
			}
		},
		onLoad() {
		},
		onShow(){
			//页面显示时候做的事情
			let globalData=getApp().globalData;
			console.log(globalData);
			if(globalData==null||globalData==''||globalData==undefined){
				return;
			}
			
			let payStatus=globalData.payStatus;
			let orderNo=globalData.orderNo;
			
			
			if(payStatus){
				uni.showToast({
					title:'支付成功',
					icon:"success"
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
					notify_url, auto, auto_node, config_no,null, payKey);
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
					config_no,null, payKey).then((response) => {
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
			wapPay:async function(){
				let out_trade_no = new Date().getTime();
				let total_fee = "0.01";
				let mch_id = "1602333609";
				let body = "扫码支付测试";
				let attach = null;
				let notify_url = null;
				let return_url=null;
				let auto = null;
				let auto_node = null;
				let config_no = null;
				let payKey = "D29ADE73DC084C5EB434302014687FAF";
				let result = await WxPay.wapPayAsync(out_trade_no, total_fee, mch_id, body, attach, notify_url, return_url, auto, auto_node, config_no,null, payKey);
				
				var referLink = document.createElement('a');   
				referLink.href = "http://www.yungouos.com";   
				document.body.appendChild(referLink);   
				referLink.click();   
			},
			/**
			 * 小程序支付
			 */
			minAppPay:function(){
				let out_trade_no = new Date().getTime();
				let total_fee = "0.01";
				let mch_id = "1529637931";
				let body = "小程序支付演示";
				let attach = null;
				let title="海底捞";
				let notify_url = "http://api.merchant.yungouos.com/api/system/demo/callback";
				let auto = null;
				let auto_node = null;
				let config_no = null;
				let biz_params=null;
				let payKey = "499F61DB734C4BF39792A098C44FA80A";
				
				WxPay.minAppPay(out_trade_no, total_fee, mch_id, body, attach, title, notify_url, auto, auto_node, config_no, biz_params, payKey);
				
				
				// let params=WxPay.minAppPayParams(out_trade_no, total_fee, mch_id, body, attach, title, notify_url, auto, auto_node, config_no, biz_params, payKey);
				
				// uni.navigateToMiniProgram({
				//         appId: 'wxd9634afb01b983c0',//支付收银小程序的appid 固定值 不可修改
				//         path: '/pages/pay/pay',//支付页面 固定值 不可修改
				//         extraData: params,//携带的参数 参考API文档
				//         success(res) {
				//             console.log("小程序拉起成功");
							
				// 			//最自己的业务
				//         }
				// })
				
				// console.log(params);
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
	.btn-view{
		margin-top:20px;
	}
</style>

