import com.yungouos.pay.entity.RefundOrder;
import com.yungouos.pay.entity.RefundSearch;
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
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
