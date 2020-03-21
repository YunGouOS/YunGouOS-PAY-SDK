import com.alibaba.fastjson.JSONObject;
import com.yungouos.pay.entity.CodePayBiz;
import com.yungouos.pay.entity.FacePayBiz;
import com.yungouos.pay.entity.RefundOrder;
import com.yungouos.pay.entity.RefundSearch;
import com.yungouos.pay.entity.WxDownloadBillBiz;
import com.yungouos.pay.entity.WxOauthInfo;
import com.yungouos.pay.wxpay.WxPay;

/**
 *
 * 微信支付调用演示
 * 
 * @author YunGouOS技术部-029
 *
 */
public class WxPayTest {

	public static void main(String[] args) {

		String result;
		String mchId = "1529637931";
		String key = "6BA371F4CFAB4465AA04DAEADBAC4161";
		// 收银台支付结束后返回地址
		String returnUrl = "http://www.baidu.com";
		try {

			/**
			 * 付款码支付（被扫）
			 */
			CodePayBiz codePayBiz = WxPay.codePay(System.currentTimeMillis() + "", "0.01", mchId, "测试", "134681285892396042", null, null, null, null, null, null, key);
			System.out.println("付款码支付结果：" + codePayBiz.toString());

			/**
			 * 扫码支付 返回二维码连接
			 */
			result = WxPay.nativePay(System.currentTimeMillis() + "", "1", mchId, "测试", null, null, null, null, null, null, null, key);
			System.out.println("扫码支付 结果：" + result);

			/**
			 * 公众号支付 返回JSSDK需要的jspackage
			 */
			String jspackage = WxPay.jsapiPay(System.currentTimeMillis() + "", "1", mchId, "测试", "o-_-itxeWVTRnl-iGT_JJ-t3kpxU", null, null, null, null, null, null, key);
			System.out.println("公众号支付结果：" + jspackage);

			/**
			 * 收银台支付 返回收银台支付地址，跳转到该地址即可
			 */
			String cashierPayUrl = WxPay.cashierPay(System.currentTimeMillis() + "", "1", mchId, "测试收银台支付", null, null, null, null, null, null, key);
			System.out.println("收银台支付结果：" + cashierPayUrl);

			/**
			 * 小程序支付 不是真正的下单，组装参数。拿到参数后使用小程序的前端将参数传递给支付收银小程序
			 */
			JSONObject minAppPay = WxPay.minAppPay(System.currentTimeMillis() + "", "0.01", mchId, "小程序支付演示", "海底捞", null, null, null, null, null, key);
			System.out.println("小程序支付结果：" + minAppPay.toJSONString());

			/**
			 * 微信刷脸支付
			 */
			FacePayBiz facePayBiz = WxPay.facePay(System.currentTimeMillis() + "", "0.01", mchId, "人脸支付测试", "o-_-itxeWVTRnl-iGT_JJ-t3kpxU", "人脸特征码", null, null, null, null, null, key);
			System.out.println("刷脸支付结果：" + facePayBiz);

			/**
			 * 微信h5支付
			 */
			String h5payResult = WxPay.H5Pay(System.currentTimeMillis() + "", "0.01", mchId, "H5支付测试，仅限企业", null, null, null, null, null, null, key);
			System.out.println("微信H5支付结果：" + h5payResult);

			/**
			 * 查询刷卡支付结果
			 */
			CodePayBiz codePayBiz2 = WxPay.getCodePayResult("1556267522899", mchId, key);
			System.out.println("微信刷卡支付结果：" + codePayBiz2.toString());

			/**
			 * 订单退款
			 */
			RefundOrder refundOrder = WxPay.orderRefund("1556267522899", mchId, "0.1", key);
			System.out.println("订单退款结果：" + refundOrder.toString());

			/**
			 * 查询退款结果
			 */
			RefundSearch refundSearch = WxPay.getRefundResult("R17200911248111", mchId, key);
			System.out.println("查询退款结果：" + refundSearch.toString());

			/**
			 * 获取微信授权url
			 */
			String url = "http://www.yungouos.com/oauth?a=1"; // 授权结束后写到code参数返回到该地址注意需要包含http://以及携带一个参数
																
			JSONObject paramJson = new JSONObject();
			// 额外参数 按需添加，可以同查询授权信息接口获得
			paramJson.put("key", "123456");
			String oauthUrl = WxPay.getWxOauthUrl(paramJson.toJSONString(), url);
			// 该地址直接重定向出去 完成授权后会跳转到 携带参数跳转到传递的url地址上
			// 示例值：http://www.yungouos.com/oauth?a=1&code=364BD76826BD4EDEB475FF5A00B6750E
			System.out.println("获取微信授权url结果：" + oauthUrl);

			/**
			 * 查询微信授权信息
			 */
			String code = "9D71A178C2EE4BA4AA7715F87B3694F9";// 通过授权返回的url中
			WxOauthInfo wxOauthInfo = WxPay.getWxOauthInfo(code);
			System.out.println("查询微信授权信息结果：" + wxOauthInfo.toString());

			/**
			 * 下载对账单 正常直接通过getUrl获取到excel地址到浏览器访问下载即可
			 * 也可以通过getList获取到对账单的数据流集成到业务系统中
			 */
			WxDownloadBillBiz downloadBillBiz = WxPay.downloadBill(mchId, "2020-01-29", key);
			System.out.println("对账单excel地址：" + downloadBillBiz.getUrl());
			System.out.println("对账单数据：" + downloadBillBiz.getList().toString());
			System.out.println("对账单统计数据：" + downloadBillBiz.getTotal().toString());

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
