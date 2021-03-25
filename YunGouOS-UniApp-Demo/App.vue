<script>
	export default {
		globalData: {
		    payStatus: false,
			orderNo:null,
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function(options) {
			console.log(options);

			if (options == null || options == '' || options.referrerInfo == null || options.referrerInfo == '') {
				return;
			}

			//跳转回商户小程序参数示例：{"code": 0,"data":{"orderNo":"123456"},"msg": "支付成功"}
			let extraData = options.referrerInfo.extraData;
			if (extraData) {
				//不管成功失败 先把支付结果赋值
				this.globalData.payStatus = extraData.code == 0 ? true : false;
				if (extraData.code != 0) {
					uni.showToast({
						title: extraData.msg, //错误提示
						icon: 'none',
						duration: 3000
					})
					return;
				}
				//支付成功
				this.globalData.orderNo = extraData.data.orderNo;
			}

		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
