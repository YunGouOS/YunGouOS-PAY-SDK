import com.yungouos.pay.alipay.AliPay;
import com.yungouos.pay.entity.AliPayJsPayBiz;
import com.yungouos.pay.entity.RefundOrder;
import com.yungouos.pay.entity.RefundSearch;

/**
 * 
 * 支付宝SDK调用演示
 * 
 * @author YunGouOS技术部-029
 *
 */
public class AliPayTest {

	public static void main(String[] args) {
		String result;
		// 支付宝商户号，登录www.yungouos.com-》支付宝-》商户管理 获取
		String mch_id = "签约后的商户号";
		// 商户密钥
		String key = "签约后的密钥";
		// 回调地址
		String notify = "http://www.baidu.com";

		// 同步回调地址
		String returnUrl = "http://www.baidu.com";

		try {
			// 支付宝扫码支付
			result = AliPay.nativePay(System.currentTimeMillis() + "", "0.01", mch_id, "测试订单", "2", null, notify, key);
			System.out.println("支付宝扫码支付返回结果：" + result);

			// 支付宝wap支付
			result = AliPay.wapPay(System.currentTimeMillis() + "", "0.01", mch_id, "支付测试", null, notify, key);
			System.out.println("支付宝wap支付返回结果：" + result);

			String buyer_id = "支付宝买家唯一编号，通过支付宝授权接口获取";

			// 支付宝JS支付
			AliPayJsPayBiz aliPayJsPayBiz = AliPay.jsPay(System.currentTimeMillis() + "", "0.01", mch_id, buyer_id, "支付测试", null, notify, key);
			System.out.println("支付宝JS支付返回结果：" + aliPayJsPayBiz.toString());

			// 支付宝H5支付
			String h5Pay = AliPay.h5Pay(System.currentTimeMillis() + "", "0.01", mch_id, "接口测试", null, notify, returnUrl, key);
			System.out.println("支付宝H5支付返回结果："+h5Pay);

			// 支付宝appPay支付
			String appPay = AliPay.appPay(System.currentTimeMillis() + "", "0.01", mch_id, "接口测试", null, notify, key);
			System.out.println("支付宝APP支付返回结果："+appPay);

			// 发起退款
			RefundOrder orderRefund = AliPay.orderRefund("Y194506551713811", mch_id, "0.01", "测试退款", key);
			System.out.println("支付宝发起退款返回结果：" + orderRefund.toString());

			// 退款查询
			RefundSearch refundSearch = AliPay.getRefundResult("R09441868126739", mch_id, key);
			System.out.println("支付宝退款结果查询返回结果：" + refundSearch.toString());

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
