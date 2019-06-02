import com.alibaba.fastjson.JSONObject;
import com.yungouos.pay.entity.RefundOrder;
import com.yungouos.pay.entity.RefundSearch;
import com.yungouos.pay.entity.WxOauthInfo;
import com.yungouos.pay.entity.WxPayOrder;
import com.yungouos.pay.wxpay.WxPay;

public class WxPayTest {

	/**
	 * 扫码支付测试
	 * 
	 * @author YunGouOS
	 * @date 2019年4月28日 下午2:26:17
	 */
	public static void main(String[] args) {
		String result;
		String mchId="1529637931";
		String key="6BA371F4CFAB4465AA04DAEADBAC4161";
		//收银台支付结束后返回地址
		String returnUrl="http://www.baidu.com";
		try {
			/**
			 * 扫码支付 返回二维码连接
			 */
			result = WxPay.nativePay(System.currentTimeMillis() + "", "1", mchId, "测试", null, null, null, null, key);
			System.out.println(result);
			
			/**
			 * 公众号支付  返回JSSDK需要的jspackage
			 */
			String jspackage = WxPay.jsapiPay(System.currentTimeMillis() + "", "1", mchId, "测试", "o-_-itxeWVTRnl-iGT_JJ-t3kpxU", null, null, null, key);
			System.out.println(jspackage);
			
			/**
			 * 收银台支付  返回收银台支付地址，跳转到该地址即可
			 */
			String cashierPayUrl=WxPay.cashierPay(System.currentTimeMillis() + "", "1", mchId, "测试收银台支付", null, null, returnUrl, key);
			System.out.println(cashierPayUrl);
			
			
			/**
			 * 订单查询
			 */
			WxPayOrder wxPayOrder = WxPay.getOrderInfoByOutTradeNo("1556267522899", mchId, key);
			System.out.println(wxPayOrder.toString());
			
			/**
			 * 订单退款
			 */
			RefundOrder refundOrder = WxPay.orderRefund("1556267522899", mchId, "0.1", key);
			System.out.println(refundOrder.toString());
			
			
			/**
			 * 查询退款结果
			 */
			RefundSearch refundSearch = WxPay.getRefundResult("R17200911248111", mchId, key);
			System.out.println(refundSearch.toString());
			
			/**
			 * 获取微信授权url
			 */
			String url="http://www.yungouos.com/oauth?a=1"; //授权结束后写到code参数返回到该地址 注意需要包含 http:// 以及携带一个参数
			
			JSONObject paramJson=new JSONObject();
			//额外参数 按需添加，可以同查询授权信息接口获得
			paramJson.put("key", "123456");
			
			String oauthUrl = WxPay.getWxOauthUrl(paramJson.toJSONString(), url);
			//该地址直接重定向出去 完成授权后会跳转到 携带参数跳转到传递的url地址上 示例值：http://www.yungouos.com/oauth?a=1&code=364BD76826BD4EDEB475FF5A00B6750E
			System.out.println(oauthUrl);
			
			/**
			 * 查询微信授权信息
			 */
			String code="45AA0CEE43AE4F048384D655A77FA770";//通过授权返回的url中
			WxOauthInfo wxOauthInfo = WxPay.getWxOauthInfo(code);
			System.out.println(wxOauthInfo.toString());
			
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
