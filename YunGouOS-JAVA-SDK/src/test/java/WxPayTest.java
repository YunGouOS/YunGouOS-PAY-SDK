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
		try {
			/**
			 * 扫码支付
			 */
			result = WxPay.nativePay(System.currentTimeMillis() + "", "0.01", "1529637931", "测试", null, null, null, null, "6BA371F4CFAB4465AA04DAEADBAC4161");
			System.out.println(result);
			
			/**
			 * 公众号支付
			 */
			String jspackage = WxPay.jsapi(System.currentTimeMillis() + "", "0.01", "1529637931", "测试", "o-_-itxeWVTRnl-iGT_JJ-t3kpxU", null, null, null, "6BA371F4CFAB4465AA04DAEADBAC4161");
			System.out.println(jspackage);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
