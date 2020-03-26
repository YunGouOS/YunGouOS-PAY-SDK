import com.yungouos.pay.alipay.AliPay;
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
		// 支付宝商户号，登录www.yungouos.com-》支付宝-》我的支付 获取
		String mch_id = "2088902606090365";
		// 商户密钥
		String key = "28CB379EB9E84B43A638F01BEE5B800F";
		// 回调地址
		String notify = "http://www.baidu.com";

		try {
			// 支付宝扫码支付
			result = AliPay.nativePay(System.currentTimeMillis() + "", "0.01", mch_id, "测试订单", "2", null, notify, key);
			System.out.println("支付宝扫码支付返回结果：" + result);

			// 支付宝wap支付
			result = AliPay.wapPay(System.currentTimeMillis() + "", "0.01", mch_id, "支付测试", null, notify, key);
			System.out.println("支付宝wap支付返回结果：" + result);

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
