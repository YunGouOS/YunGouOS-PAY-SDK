<template>
	<view>

	</view>
</template>

<script>
	import {
		WxLogin,
		WxPay
	} from 'yungouos-pay-uniapp-sdk';
	export default {
		data() {
			return {
				code: null,
				openId: null,
				jsPayParams:{}
			}
		},
		methods: {
			onLoad(options) {
				if (options == null || options == undefined || options == '') {
					return;
				}
				let code = options.code;
				if (code == null || code == undefined || code == "") {
					return;
				}
				//根据授权的code查询用户授权信息
				this.code = code;
				this.getOauthInfo();
			},
			/**
			 * 获取授权信息
			 */
			getOauthInfo: async function() {
				let code = this.code;
				let result = await WxLogin.getBaseOauthInfoAsync(code);
				if (result == null || result == undefined || result == "") {
					return;
				}
				let openId = result.openId;
				if (openId == null || openId == undefined || openId == "") {
					return;
				}
				this.openId = openId;
				this.jsPay();
			},
			/**
			 * 调用公众号支付接口
			 */
			jsPay: async function() {
				let out_trade_no = new Date().getTime();
				let total_fee = "0.01";
				let mch_id = "1529637931";
				let body = "收银台支付接口演示";
				let openId = this.openId;
				let attach = null;
				let notify_url = "http://api.merchant.yungouos.com/api/system/demo/callback";
				let return_url="http://localhost.yungouos.com:8080/#/pages/index/index";
				let auto = null;
				let auto_node = null;
				let config_no = null;
				let biz_params = null;
				let payKey = "499F61DB734C4BF39792A098C44FA80A";
				let result = await WxPay.jsapiPayAsync(out_trade_no, total_fee, mch_id, body, openId, attach,
					notify_url, auto, auto_node, config_no, biz_params, payKey);
				this.jsPayParams=JSON.parse(result);
				this.callpay();
			},
			jsApiCall: function() {
				WeixinJSBridge.invoke(
					'getBrandWCPayRequest', this.jsPayParams,
					function(res) {
						WeixinJSBridge.log(res.err_msg);
						if (res.err_msg == "get_brand_wcpay_request:ok") {
							alert("支付成功");
						} else {
							alert('交易取消' + res.err_msg);
						}
					}
				);
			},
			callpay: function() {
				if (typeof WeixinJSBridge == "undefined") {
					if (document.addEventListener) {
						document.addEventListener('WeixinJSBridgeReady', jsApiCall, false);
					} else if (document.attachEvent) {
						document.attachEvent('WeixinJSBridgeReady', jsApiCall);
						document.attachEvent('onWeixinJSBridgeReady', jsApiCall);
					}
				} else {
					this.jsApiCall();
				}
			}

		},

	}
</script>

<style>

</style>
